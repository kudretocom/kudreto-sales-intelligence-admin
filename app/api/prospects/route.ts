import { NextResponse } from "next/server";

type ProspectRequest = {
  companyName: string;
  companyDomain?: string;
  titles?: string[];
  location?: string;
};

type ApolloPerson = {
  id?: string;
  name?: string;
  title?: string;
  linkedin_url?: string;
  organization?: {
    name?: string;
    website_url?: string;
    linkedin_url?: string;
  };
};

type PdlPerson = {
  full_name?: string;
  job_title?: string;
  linkedin_url?: string;
  job_company_name?: string;
};

const defaultTitles = [
  "Founder",
  "CEO",
  "Chief Product Officer",
  "Head of Product",
  "Product Director",
  "Product Manager",
  "Head of Design",
  "UX Director",
  "Head of Digital",
  "Head of Operations",
  "Digital Transformation",
];

export async function POST(request: Request) {
  const body = (await request.json()) as ProspectRequest;

  if (!body.companyName) {
    return NextResponse.json({ error: "companyName gerekli." }, { status: 400 });
  }

  const [apollo, pdl] = await Promise.allSettled([
    searchApolloPeople(body),
    searchPdlPeople(body),
  ]);

  return NextResponse.json({
    companyName: body.companyName,
    sources: {
      apollo: apollo.status === "fulfilled" ? apollo.value : { enabled: false, error: apollo.reason?.message },
      peopleDataLabs: pdl.status === "fulfilled" ? pdl.value : { enabled: false, error: pdl.reason?.message },
    },
  });
}

async function searchApolloPeople(body: ProspectRequest) {
  const apiKey = process.env.APOLLO_API_KEY;

  if (!apiKey) {
    return {
      enabled: false,
      reason: "APOLLO_API_KEY tanımlı değil.",
      prospects: [],
    };
  }

  const query = new URLSearchParams();
  query.set("page", "1");
  query.set("per_page", "10");

  const titles = body.titles?.length ? body.titles : defaultTitles;
  titles.forEach((title) => query.append("person_titles[]", title));

  if (body.companyDomain) {
    query.append("q_organization_domains_list[]", body.companyDomain.replace(/^https?:\/\//, "").replace(/^www\./, ""));
  } else {
    query.set("q_keywords", body.companyName);
  }

  if (body.location) {
    query.append("person_locations[]", body.location);
  }

  const response = await fetch(`https://api.apollo.io/api/v1/mixed_people/api_search?${query.toString()}`, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return {
      enabled: true,
      ok: false,
      status: response.status,
      prospects: [],
    };
  }

  const data = await response.json();
  const people = ((data.people ?? data.contacts ?? []) as ApolloPerson[]).slice(0, 10);

  return {
    enabled: true,
    ok: true,
    prospects: people.map((person) => ({
      name: person.name,
      title: person.title,
      linkedinUrl: person.linkedin_url,
      companyName: person.organization?.name,
      companyLinkedinUrl: person.organization?.linkedin_url,
    })),
  };
}

async function searchPdlPeople(body: ProspectRequest) {
  const apiKey = process.env.PDL_API_KEY;

  if (!apiKey) {
    return {
      enabled: false,
      reason: "PDL_API_KEY tanımlı değil.",
      prospects: [],
    };
  }

  const titles = body.titles?.length ? body.titles : defaultTitles;
  const titleSql = titles.map((title) => `job_title='${escapeSqlValue(title)}'`).join(" OR ");
  const sql = `SELECT * FROM person WHERE job_company_name='${escapeSqlValue(body.companyName)}' AND (${titleSql})`;

  const response = await fetch("https://api.peopledatalabs.com/v5/person/search", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      sql,
      size: 10,
    }),
  });

  if (!response.ok) {
    return {
      enabled: true,
      ok: false,
      status: response.status,
      prospects: [],
    };
  }

  const data = await response.json();
  const people = ((data.data ?? []) as PdlPerson[]).slice(0, 10);

  return {
    enabled: true,
    ok: true,
    prospects: people.map((person) => ({
      name: person.full_name,
      title: person.job_title,
      linkedinUrl: person.linkedin_url,
      companyName: person.job_company_name,
    })),
  };
}

function escapeSqlValue(value: string) {
  return value.replaceAll("'", "''");
}
