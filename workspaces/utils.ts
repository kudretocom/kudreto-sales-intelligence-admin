export function googleSearchUrl(query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function bingSearchUrl(query: string) {
  return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
}

export function linkedinCompanySearchUrl(companyName: string) {
  return `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(companyName)}`;
}

export function linkedinPeopleSearchUrl(companyName: string, query: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${companyName} ${query}`)}`;
}

export function clampScore(score: number) {
  return Math.max(58, Math.min(98, score));
}
