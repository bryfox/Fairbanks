import Config from 'react-native-config'

export default class ApiProvider {

  /**
    Note: `publication_date` has a constant format in this version of the API;
    other dates seen (as in `title`) do not.
    @return Promise that resolves to an API response object.
    @example
    {
      "uri": "http://example.com/2017-06-10",
      "title": "Daily Forecast: June 10, 2017",
      "soundcloud_id": null,
      "publication_date": "2017-06-10",
      "id": "ad6ab1e4-06e5-49b7-90a7-80bcf6a4b9c8",
      "detailed_summary": {},
      "extended_summary": {},
      "recreational_summary": {},
      "description": "Sunny and warm"
    }
    @throws
  */
  getDailyUpdate () {
    console.log('[ApiProvider] Fetching latest data from', ApiUrl)
    headers = { 'Content-Type': 'application/json' }
    return fetch(ApiUrl, {})
            .then(resp => resp.json())
            .then(json => json.data)
  }
}

const ApiUrl = `${Config.API_ROOT}/api/v1/forecasts/today`
