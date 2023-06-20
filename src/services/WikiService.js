import HttpService from "./HttpService";
import AppConfig from "AppConfig";

const apiEndpointGetUrl = AppConfig.apiUrl + "/wikiUrl.php";
const apiEndpointPostUrl = AppConfig.apiUrl + "/storeWikiUrl.php";

export function getWiki() {
  return HttpService.get(apiEndpointGetUrl);
}

export function storeWiki(wiki) {
  return HttpService.post(apiEndpointPostUrl, {
    title: wiki.title,
    link: wiki.link,
  });
}
