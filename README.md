# Fairbanks

State shape

{
  todayForecast: {
    date: Date,
    details: [{header: "", text: ""}],
    summary?: "",
    soundcloudId?: ""
  },
  extendedForecast: { ... },
  recreationalForecast: { ... }
}


Presentational Components

- ForecastView
    ? Summary
    ? AudioPlayer
    - [SectionList]
        - SectionItem
            - Header
            - Commentary

    - NavigationButton
