import { gql } from "apollo-boost";

export const COVID_RESULTS = gql`
  query results($countries: [String], $date: DateInput) {
    results(countries: $countries, date: $date) {
      date
      confirmed
      deaths
      recovered
      growthRate
    }
  }
`;
