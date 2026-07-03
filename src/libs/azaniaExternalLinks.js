export const INTERNET_BANKING_LOGIN_URL =
	"https://digital.azaniabank.co.tz/internet-banking/login";

export function isExternalUrl(url) {
	return /^https?:\/\//i.test(url || "");
}
