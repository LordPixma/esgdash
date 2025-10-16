// Mock data for testing without API keys

export const MOCK_FRED_GDP = {
  observations: [
    { date: '2020-01-01', value: '21427.7' },
    { date: '2020-04-01', value: '19520.1' },
    { date: '2020-07-01', value: '21170.3' },
    { date: '2020-10-01', value: '21480.9' },
    { date: '2021-01-01', value: '22038.2' },
    { date: '2021-04-01', value: '22740.9' },
    { date: '2021-07-01', value: '23187.0' },
    { date: '2021-10-01', value: '23940.3' },
    { date: '2022-01-01', value: '24386.7' },
    { date: '2022-04-01', value: '24880.1' },
    { date: '2022-07-01', value: '25360.0' },
    { date: '2022-10-01', value: '25740.7' },
    { date: '2023-01-01', value: '26139.9' },
    { date: '2023-04-01', value: '26567.0' },
    { date: '2023-07-01', value: '27073.1' },
    { date: '2023-10-01', value: '27610.1' },
  ]
};

export const MOCK_FRED_UNRATE = {
  observations: [
    { date: '2020-01-01', value: '3.6' },
    { date: '2020-02-01', value: '3.5' },
    { date: '2020-03-01', value: '4.4' },
    { date: '2020-04-01', value: '14.7' },
    { date: '2020-05-01', value: '13.3' },
    { date: '2020-06-01', value: '11.1' },
    { date: '2020-07-01', value: '10.2' },
    { date: '2020-08-01', value: '8.4' },
    { date: '2020-09-01', value: '7.8' },
    { date: '2020-10-01', value: '6.9' },
    { date: '2020-11-01', value: '6.7' },
    { date: '2020-12-01', value: '6.7' },
    { date: '2021-01-01', value: '6.3' },
    { date: '2021-04-01', value: '6.0' },
    { date: '2021-07-01', value: '5.4' },
    { date: '2021-10-01', value: '4.2' },
    { date: '2022-01-01', value: '4.0' },
    { date: '2022-04-01', value: '3.6' },
    { date: '2022-07-01', value: '3.5' },
    { date: '2022-10-01', value: '3.7' },
    { date: '2023-01-01', value: '3.4' },
    { date: '2023-04-01', value: '3.5' },
    { date: '2023-07-01', value: '3.6' },
    { date: '2023-10-01', value: '3.7' },
  ]
};

export const MOCK_WORLDBANK_CO2 = {
  metadata: { page: 1, pages: 1, per_page: 50, total: 24 },
  data: [
    { date: '2000', value: 20.18, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2001', value: 19.84, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2002', value: 19.65, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2003', value: 19.56, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2004', value: 19.69, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2005', value: 19.56, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2006', value: 19.22, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2007', value: 19.18, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2008', value: 18.46, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2009', value: 17.36, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2010', value: 17.56, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2011', value: 17.05, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2012', value: 16.26, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2013', value: 16.40, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2014', value: 16.34, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2015', value: 16.10, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2016', value: 15.79, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2017', value: 15.69, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2018', value: 15.74, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2019', value: 15.39, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2020', value: 13.76, indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
  ]
};

export const MOCK_WORLDBANK_GDP_GROWTH = {
  metadata: { page: 1, pages: 1, per_page: 50, total: 24 },
  data: [
    { date: '2000', value: 4.1, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2001', value: 0.9, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2002', value: 1.7, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2003', value: 2.9, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2004', value: 3.8, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2005', value: 3.5, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2006', value: 2.9, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2007', value: 1.9, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2008', value: -0.1, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2009', value: -2.5, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2010', value: 2.7, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2011', value: 1.6, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2012', value: 2.2, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2013', value: 1.8, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2014', value: 2.5, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2015', value: 3.1, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2016', value: 1.7, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2017', value: 2.3, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2018', value: 3.0, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2019', value: 2.3, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2020', value: -2.8, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2021', value: 5.8, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
    { date: '2022', value: 2.1, indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' }, country: { id: 'US', value: 'United States' }, countryiso3code: 'USA', unit: '', obs_status: '', decimal: 2 },
  ]
};

/**
 * Get mock data based on series/indicator ID
 */
export function getMockFredData(seriesId: string): any {
  switch (seriesId.toUpperCase()) {
    case 'GDP':
      return MOCK_FRED_GDP;
    case 'UNRATE':
      return MOCK_FRED_UNRATE;
    default:
      return MOCK_FRED_GDP;
  }
}

export function getMockWorldBankData(indicatorId: string): any {
  switch (indicatorId) {
    case 'EN.ATM.CO2E.PC':
      return MOCK_WORLDBANK_CO2;
    case 'NY.GDP.MKTP.KD.ZG':
      return MOCK_WORLDBANK_GDP_GROWTH;
    default:
      return MOCK_WORLDBANK_GDP_GROWTH;
  }
}
