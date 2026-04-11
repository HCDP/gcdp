import { Injectable } from '@angular/core';
import moment, { Moment } from "moment-timezone";
import { StringMap } from '../models/types';
import { DateManagerService } from './dateManager/date-manager.service';
import { RequestFactoryService } from './requests/request-factory.service';
import { RequestResults } from './requests/request.service';


@Injectable({
  providedIn: 'root'
})
export class DatasetFormManagerService {
  private _visFormManager: FormManager<VisDatasetItem>;
  private _exportFormManager: FormManager<ExportDatasetItem>;

  constructor(private dateHandler: DateManagerService, private requestFactory: RequestFactoryService) {
    this.setupDatasets();
  }

  ////////////// set up datasets ///////////////////
  private setupDatasets() {
    //set up form data
    ////values
    //////period
    let periodDay = new FormValue(new DisplayData("Data measured at a daily time scale.", "Daily", "day"), {period: "day"}, [true, true]);
    let periodMonth = new FormValue(new DisplayData("Data measured at a monthly time scale.", "Monthly", "month"), {period: "month"}, [true, true]);

    //fill
    let fillPartialFilled = new FormValue(new DisplayData("This data has undergone QA/QC and is partially filled using statistical techniques to estimate some missing station values.", "Partial Filled", "partial"), {fill: "partial"}, [false, true]);
    //Climatology mean type
    let meanMonthly = new FormValue(new DisplayData("Mean monthly maps", "Mean Monthly", "mean_monthly"), {mean_type: "mean_monthly"}, [true, true]);
    let meanAnnual30 = new FormValue(new DisplayData("Annual maps averaged over a 30 year period", "Mean 30 Year Annual", "mean_30yr_annual"), {mean_type: "mean_30yr_annual"}, [true, true]);
    //Climatology period
    let periodJanuaryPrism = new FormValue(new DisplayData("Average values aggregated over the month of January over the years 1971-2000", "January", "january"), {period: "january"}, [true, true]);
    let periodFebruaryPrism = new FormValue(new DisplayData("Average values aggregated over the month of February over the years 1971-2000", "February", "february"), {period: "february"}, [true, true]);
    let periodMarchPrism = new FormValue(new DisplayData("Average values aggregated over the month of March over the years 1971-2000", "March", "march"), {period: "march"}, [true, true]);
    let periodAprilPrism = new FormValue(new DisplayData("Average values aggregated over the month of April over the years 1971-2000", "April", "april"), {period: "april"}, [true, true]);
    let periodMayPrism = new FormValue(new DisplayData("Average values aggregated over the month of May over the years 1971-2000", "May", "may"), {period: "may"}, [true, true]);
    let periodJunePrism = new FormValue(new DisplayData("Average values aggregated over the month of June over the years 1971-2000", "June", "june"), {period: "june"}, [true, true]);
    let periodJulyPrism = new FormValue(new DisplayData("Average values aggregated over the month of July over the years 1971-2000", "July", "july"), {period: "july"}, [true, true]);
    let periodAugustPrism = new FormValue(new DisplayData("Average values aggregated over the month of August over the years 1971-2000", "August", "august"), {period: "august"}, [true, true]);
    let periodSeptemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of September over the years 1971-2000", "September", "september"), {period: "september"}, [true, true]);
    let periodOctoberPrism = new FormValue(new DisplayData("Average values aggregated over the month of October over the years 1971-2000", "October", "october"), {period: "october"}, [true, true]);
    let periodNovemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of November over the years 1971-2000", "November", "november"), {period: "november"}, [true, true]);
    let periodDecemberPrism = new FormValue(new DisplayData("Average values aggregated over the month of December over the years 1971-2000", "December", "december"), {period: "december"}, [true, true]);
    let period30yrPrism = new FormValue(new DisplayData("30 year climatology averaged over the years 1971-2000", "1971-2000", "1971-2000"), {period: "1971-2000"}, [true, true]);
    //Downscaling
    //////downscaling method
    let dsmChelsa = new FormValue(new DisplayData("CHELSA is essentially a statistical downscaling of the ERA-Interim reanalysis, with the temperature downscaling based on mean lapse rates and elevation, and the precipitation algorithm using geographic predictors including wind fields, exposure, and boundary layer height. The data are intended for applications that depend on high resolution data.", "CHELSA", "chelsa"), {dsm: "chelsa"}, [true, true]);
    //////climate model
    let climateSSP126 = new FormValue(new DisplayData("This scenario uses an additional radiative forcing of 2.6 W/m² by the year 2100 and is a remake of the optimistic scenario RCP2.6. This scenario designed with the aim of simulating a development that is compatible with the 2°C target. This scenario assumes climate protection measures being taken.", "SSP126", "ssp126"), {model: "ssp126"}, [true, true]);
    let climateSSP370 = new FormValue(new DisplayData("This scenario uses an additional radiative forcing of 7 W/m² by the year 2100 and is in the upper-middle part of the full range of scenarios. It was newly introduced after the RCP scenarios, closing the gap between RCP6.0 and RCP8.5.", "SSP370", "ssp370"), {model: "ssp370"}, [true, true]);
    let climateSSP585 = new FormValue(new DisplayData("This scenario uses an additional radiative forcing of 8.5 W/m² by the year 2100, this scenario represents the upper boundary of the range of scenarios described in the literature. It can be understood as an update of the CMIP5 scenario RCP8.5, now combined with socioeconomic reasons.", "SSP585", "ssp585"), {model: "ssp585"}, [true, true]);
    //////season
    let seasonAnnual = new FormValue(new DisplayData("Includes all annual data.", "Annual", "annual"), {season: "annual"}, [true, true]);
    let seasonDry = new FormValue(new DisplayData("Only includes data from the wet season.", "Wet", "wet"), {season: "wet"}, [true, true]);
    let seasonWet = new FormValue(new DisplayData("Only includes data from the dry season.", "Dry", "dry"), {season: "dry"}, [true, true]);
    //ds period
    let periodChelsaLate = new FormValue(new DisplayData("Late-century (2071-2100) projections.", "Late-Century (2071-2100)", "2071-2100"), {period: "2071-2100"}, [true, true]);
    //view types
    let percentChangeView = new FormValue(new DisplayData("Percent change in value relative to present day conditions.", "Percent change", "percent"), {
      type: "percent"
    }, null);
    let absoluteChangeView = new FormValue(new DisplayData("Change in value relative to present day conditions.", "Absolute change", "absolute"), {
      type: "absolute"
    }, null);
    let valueView = new FormValue(new DisplayData("Projected value", "Value", "direct"), {
      type: "direct"
    }, null);


    ////values
   
    //////units
    let mmUnits = new FormValue(new DisplayData("Values in millimeters", "mm", "mm"), {
      units: "mm"
    }, null);
    let inUnits = new FormValue(new DisplayData("Values in millimeters", "in", "in"), {
      units: "in"
    }, null);
    let cUnits = new FormValue(new DisplayData("Values in degrees celcius", "°C", "c"), {
      units: "celcius"
    }, null);
    let fUnits = new FormValue(new DisplayData("Values in degrees celcius", "°F", "f"), {
      units: "fahrenheit"
    }, null);
   

    let fillNode = new FormNode(new DisplayData("The type of processing the station data goes through.", "Data Fill", "fill"), [
      fillPartialFilled
    ]);

    let periodNode = new FormNode(new DisplayData("The time period over which the data is measured.", "Time Period", "period"), [
      periodDay,
      periodMonth
    ]);
    let prismClimatologyMeanTypeNode = new FormNode(new DisplayData("The type of data aggregation", "Mean Type", "mean_type"), [
      meanMonthly,
      meanAnnual30
    ]);

    let prismClimatologyPeriodNode = new FormNode(new DisplayData("The time period over which station data were averaged to create the map", "Data Period", "cl_mean"), [
      periodJanuaryPrism,
      periodFebruaryPrism,
      periodMarchPrism,
      periodAprilPrism,
      periodMayPrism,
      periodJunePrism,
      periodJulyPrism,
      periodAugustPrism,
      periodSeptemberPrism,
      periodOctoberPrism,
      periodNovemberPrism,
      periodDecemberPrism,
      period30yrPrism
    ]);

    //DS
    let dsmNode = new FormNode(new DisplayData("The type of downscaling climate model used for future projections.", "Downscaling Method", "dsm"), [
      dsmChelsa
    ]);
    let climateNode = new FormNode(new DisplayData("The climate model used to predict future data.", "Future Scenario", "model"), [
      climateSSP126,
      climateSSP370,
      climateSSP585
    ]);
    let seasonNode = new FormNode(new DisplayData("The season measurements and projections are made for.", "Season", "season"), [
      seasonAnnual,
      seasonDry,
      seasonWet
    ]);

    let dsPeriodNode = new FormNode(new DisplayData("The period of coverage for the data to display, including baseline present day data and future projections", "Data Period", "ds_period"), [
      periodChelsaLate
    ]);

    let viewTypeDisplayData = new DisplayData("How should the data be viewed? Either view the data directly or relative to present conditions.", "View Type", "view");
    let unitsDisplayData = new DisplayData("The units the data are represented in.", "Units", "units");

    let rfDSViewTypeNode = new FormNode(viewTypeDisplayData, [absoluteChangeView, percentChangeView, valueView], absoluteChangeView);
    let tempDSViewTypeNode = new FormNode(viewTypeDisplayData, [absoluteChangeView], absoluteChangeView);


    let rfdsUnitsNode = new FormNode(unitsDisplayData, [mmUnits, inUnits]);
    let tempdsUnitsNode = new FormNode(unitsDisplayData, [cUnits, fUnits]);


    let rfUnitsNode = new FormNode(unitsDisplayData, [mmUnits]);

    ////categories
    //right now only fill data is categorized separately under station data
    let stationDataFillCategory = new FormCategory(new DisplayData("These options apply only to the station data displayed on the map. Gridded map products are generated using partial filled station data.", "Station Data", "station_data"), [
      fillNode
    ]);

    ////form data
    //rainfall
    let rainfallFormData = new FormData([
      periodNode
    ], [
      stationDataFillCategory
    ]);
    let periodOnlyFormData = new FormData([
      periodNode
    ], []);
    //climatologies
    let prismClimatologyFormData = new FormData([
      prismClimatologyMeanTypeNode,
      prismClimatologyPeriodNode
    ], []);
    let prismClimatologyExportFormData = new FormData([
      prismClimatologyMeanTypeNode
    ], []);
    //DS
    //rainfall downscaling data
    let dsRainfallFormData = new FormData([
      dsmNode,
      climateNode,
      seasonNode,
      dsPeriodNode
    ], []);
    let dsTemperatureFormData = new FormData([
      dsmNode,
      climateNode,
      seasonNode,
      dsPeriodNode
    ], []);
    let dsRainfallExportFormData = new FormData([
      dsmNode,
      climateNode,
      seasonNode
    ], []);
    let dsTemperatureExportFormData = new FormData([
      dsmNode,
      climateNode,
      seasonNode
    ], []);


    //Create Focus Managers
    ////dates

    ////periods
    let yearPeriod = new PeriodData("year", 1, "year");
    let monthPeriod = new PeriodData("month", 1, "month");
    let dayPeriod = new PeriodData("day", 1, "day");
    ////focus managers
    let rainfallDayTimeseriesData = new TimeseriesData(dayPeriod, monthPeriod, this.dateHandler);
    let rainfallMonthTimeseriesData = new TimeseriesData(monthPeriod, yearPeriod, this.dateHandler);

    let rainfallDayPartial = new VisDatasetItem(true, true, "Millimeters", "mm", "Rainfall", "Daily Rainfall", [0, 20], [true, false], rainfallDayTimeseriesData, [rainfallDayTimeseriesData], false, {
      period: "day",
      fill: "partial"
    }, null, this.requestFactory);
    let rainfallMonthPartial = new VisDatasetItem(true, true, "Millimeters", "mm", "Rainfall", "Monthly Rainfall", [0, 650], [true, false], rainfallMonthTimeseriesData, [rainfallMonthTimeseriesData, rainfallDayTimeseriesData], false, {
      period: "month",
      fill: "partial"
    }, null, this.requestFactory);
    //climatologies
    let prismRainfallClimatologySets = [];
    let prismMaxTemperatureClimatologySets = [];
    let prismMinTemperatureClimatologySets = [];
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    for(let month of months) {
      let capMonth = month.charAt(0).toUpperCase() + month.slice(1);
      let prismRainfallClimatology = new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `${capMonth} Mean Rainfall`, [0, 650], [true, false], null, [], false, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      prismRainfallClimatologySets.push(prismRainfallClimatology);
      let prismMaxTemperatureClimatology = new VisDatasetItem(false, true, "Celcius", "°C", "Maximum Temperature", `${capMonth} Maximum Temperature`, [20, 30], [false, false], null, [], true, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      let prismMinTemperatureClimatology = new VisDatasetItem(false, true, "Celcius", "°C", "Minimum Temperature", `${capMonth} Minimum Temperature`, [20, 30], [false, false], null, [], true, {
        mean_type: "mean_monthly",
        cl_mean: month
      }, null, this.requestFactory);
      prismMaxTemperatureClimatologySets.push(prismMaxTemperatureClimatology);
      prismMinTemperatureClimatologySets.push(prismMinTemperatureClimatology);
    }

    let prismRainfallClimatology = new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `1971-2000 Mean Rainfall`, [0, 10000], [true, false], null, [], false, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    prismRainfallClimatologySets.push(prismRainfallClimatology);
    let prismMaxTemperatureClimatology = new VisDatasetItem(false, true, "Celcius", "°C", "Maximum Temperature", `1971-2000 Maximum Temperature`, [20, 30], [false, false], null, [], true, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    let prismMinTemperatureClimatology = new VisDatasetItem(false, true, "Celcius", "°C", "Minimum Temperature", `1971-2000 Minimum Temperature`, [20, 30], [false, false], null, [], true, {
      mean_type: "mean_30yr_annual",
      cl_mean: "1971-2000"
    }, null, this.requestFactory);
    prismMaxTemperatureClimatologySets.push(prismMaxTemperatureClimatology);
    prismMinTemperatureClimatologySets.push(prismMinTemperatureClimatology);
    
    //DS
    let rfUnitRepMapAnnual: ViewDataMap = {
      percent: {
        displayStyle: "diverging",
        units: {
          percent: {
            unit: "Percent",
            short: "%",
            range: [-50, 50]
          }
        }
      },
      absolute: {
        displayStyle: "diverging",
        units: {
          mm: {
            unit: "Millimeters",
            short: "mm",
            range: [-300, 300]
          },
          in: {
            unit: "Inches",
            short: "in",
            range: [-12, 12]
          }
        }
      },
      direct: {
        displayStyle: "standard",
        units: {
          mm: {
            unit: "Millimeters",
            short: "mm",
            range: [0, 10000]
          },
          in: {
            unit: "Inches",
            short: "in",
            range: [0, 394]
          }
        }
      }
    }
    let rfUnitRepMapSeasonal: ViewDataMap = {
      percent: {
        displayStyle: "diverging",
        units: {
          percent: {
            unit: "Percent",
            short: "%",
            range: [-50, 50]
          }
        }
      },
      absolute: {
        displayStyle: "diverging",
        units: {
          mm: {
            unit: "Millimeters",
            short: "mm",
            range: [-150, 150]
          },
          in: {
            unit: "Inches",
            short: "in",
            range: [-6, 6]
          }
        }
      },
      direct: {
        displayStyle: "standard",
        units: {
          mm: {
            unit: "Millimeters",
            short: "mm",
            range: [0, 5000]
          },
          in: {
            unit: "Inches",
            short: "in",
            range: [0, 197]
          }
        }
      }
    }

    let rfChelsaDSItems = [
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Annual Rainfall (SSP126) — 2071-2100`, [0, 10000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp126",
        season: "annual",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapAnnual, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Annual Rainfall (SSP370) — 2071-2100`, [0, 10000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "annual",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapAnnual, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Annual Rainfall (SSP585) — 2071-2100`, [0, 10000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "annual",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapAnnual, "absolute", "mm"), this.requestFactory),

      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Wet Season Rainfall (SSP126) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp126",
        season: "wet",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Wet Season Rainfall (SSP370) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "wet",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Wet Season Rainfall (SSP585) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "wet",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory),

      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Dry Season Rainfall (SSP126) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp126",
        season: "dry",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Dry Season Rainfall (SSP370) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "dry",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory),
      new VisDatasetItem(false, true, "Millimeters", "mm", "Rainfall", `CHELSA Downscaled Dry Season Rainfall (SSP585) — 2071-2100`, [0, 5000], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "dry",
        ds_period: "2071-2100"
      }, new OptionData(rfDSViewTypeNode, {percent: null, absolute: rfdsUnitsNode, direct: rfdsUnitsNode}, rfUnitRepMapSeasonal, "absolute", "mm"), this.requestFactory)
    ]

    let tempUnitRepMap: ViewDataMap = {
      absolute: {
        displayStyle: "increasing",
        units: {
          c: {
            unit: "Celcius",
            short: "°C",
            range: [2.5, 3.5]
          },
          f: {
            unit: "Fahrenheit",
            short: "°F",
            range: [4.5, 6.3]
          }
        }
      }
    }
    let tempChelsaDSItems = [
      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Annual Temperature (SSP370) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "annual",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory),
      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Annual Temperature (SSP585) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "annual",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory),

      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Wet Season Temperature (SSP370) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "wet",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory),
      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Wet Season Temperature (SSP585) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "wet",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory),

      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Dry Season Temperature (SSP370) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp370",
        season: "dry",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory),
      new VisDatasetItem(false, true, "Celcius", "°C", "Temperature", `CHELSA Downscaled Dry Season Temperature (SSP585) — 2071-2100`, [20, 30], [true, false], null, null, false, {
        dsm: "chelsa",
        model: "ssp585",
        season: "dry",
        ds_period: "2071-2100"
      }, new OptionData(tempDSViewTypeNode, {absolute: tempdsUnitsNode}, tempUnitRepMap, "absolute", "c"), this.requestFactory)
    ];
 
 
    ////Datasets

    //rainfall
    let rainfallDatasetDisplayData = new DisplayData("Rainfall data (1980 - 2024).", "Rainfall", "rainfall");

    let rainfallVisDataset = new Dataset<VisDatasetItem>(rainfallDatasetDisplayData, {
      location: "guam",
      datatype: "rainfall"
    }, rainfallFormData, [
      rainfallDayPartial,
      rainfallMonthPartial
    ]);

    //climatologies
    let prismClimatologyRainfallDatasetDisplayData = new DisplayData("Mean rainfall climatologies", "Mean Rainfall", "prism_mean_rf_climatology");
    let prismClimatologyMinTemperatureDatasetDisplayData = new DisplayData("Minimum air temperature climatologies", "Minimum Air Temperature", "prism_min_temp_climatology");
    let prismClimatologyMaxTemperatureDatasetDisplayData = new DisplayData("Maximum air temperature climatologies", "Maximum Air Temperature", "prism_max_temp_climatology");

    let prismRainfallClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyRainfallDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "rainfall"
    }, prismClimatologyFormData, prismRainfallClimatologySets);
    let prismMaxTemperatureClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyMaxTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "max"
    }, prismClimatologyFormData, prismMaxTemperatureClimatologySets);
    let prismMinTemperatureClimatologyVisDataset = new Dataset<VisDatasetItem>(prismClimatologyMinTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "min"
    }, prismClimatologyFormData, prismMinTemperatureClimatologySets);

    //DS
    let dsRainfallDatasetDisplayData = new DisplayData("Downscaled future projections for rainfall data.", "Rainfall Projections", "ds_rainfall");
    let dsTemperatureDatasetDisplayData = new DisplayData("Downscaled future projections for temperature data.", "Temperature Projections", "ds_temp");

    let dsRainfallVisDataset = new Dataset<VisDatasetItem>(dsRainfallDatasetDisplayData, {
      location: "guam",
      datatype: "downscaling_rainfall"
    }, dsRainfallFormData, rfChelsaDSItems);
    let dsTemperatureVisDataset = new Dataset<VisDatasetItem>(dsTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "downscaling_temperature"
    }, dsTemperatureFormData, tempChelsaDSItems);




    //////////////////////////////////////////////////////////////////////
    /////////////////////////////// export ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    //filetypes
    let geotiffFtype = new FileType("GeoTIFF", "tif", "GeoTIFF files are a variant of the TIFF file format which is used to store raster based data/graphics including georeferencing information.");
    let txtFtype = new FileType("Text", "txt", "A plaintext file.");
    let csvFtype = new FileType("Comma-Separated Values", "csv", "A text based file with data separated by commas.");

    //file display data
    let rainfallMapDisplayData = new DisplayData("A gridded rainfall map representing estimated rainfall values over Guam.", "Rainfall Map", "data_map");
    let metadataDisplayData = new DisplayData("Gridded map product metadata and error metrics.", "Metadata and Error Metrics", "metadata");
    let climatologyRainfallMapDisplayData = new DisplayData("A gridded map displaying the average estimated rainfall over the selected time period.", "Rainfall Map", "data_map");
    let climatologyTemperatureMapDisplayData = new DisplayData("A gridded map displaying the average estimated mean temperature over the selected time period.", "Temperature Map", "data_map");
    let stationPartialDisplayData = new DisplayData("Processed station data including each station's metadata and values over a period of time", "Station Data", "station_data");
    let dsRainfallMapChangeDisplayData = new DisplayData("A gridded map displaying the predicted change in rainfall from present day conditions.", "Rainfall Change Map", "data_map_change"); //includes percent
    let dsTemperatureMapChangeDisplayData = new DisplayData("A gridded map displaying the predicted change in temperature from present day conditions.", "Temperature Change Map", "data_map_change");

    ////nodes

    //fileProperties
    let rfMmUnitsProperty = new FileProperty(rfUnitsNode.filter(["mm"]), ["mm"]);
    let rfdsUnitsProperty = new FileProperty(rfdsUnitsNode, ["mm"]);
    let fillProperty = new FileProperty(fillNode, ["partial"]);
    let monthPrismClimatologyProperty = new FileProperty(prismClimatologyPeriodNode.filter(["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]), ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]);
    let yr30PrismClimatologyProperty = new FileProperty(prismClimatologyPeriodNode.filter(["1971-2000"]), ["1971-2000"]);
    let tempCUnitsProperty = new FileProperty(tempdsUnitsNode, ["c"]);
    let tempdsUnitsProperty = new FileProperty(tempdsUnitsNode, ["c"]);
    let dsPeriodProperty = new FileProperty(dsPeriodNode, ["2071-2100"])


    //package files
    let rainfallMapFile = new FileData(rainfallMapDisplayData, geotiffFtype, ["metadata"]);
    let stationFile = new FileData(stationPartialDisplayData, csvFtype, []);
    let prismClimatologyRainfallMapFile = new FileData(climatologyRainfallMapDisplayData, geotiffFtype, ["metadata"]);
    let prismClimatologyTemperatureMapFile = new FileData(climatologyTemperatureMapDisplayData, geotiffFtype, ["metadata"]);
    let metadataFile = new FileData(metadataDisplayData, txtFtype, []);
    let dsRainfallMapChangeFile = new FileData(dsRainfallMapChangeDisplayData, geotiffFtype, ["metadata"]);
    let dsTemperatureMapChangeFile = new FileData(dsTemperatureMapChangeDisplayData, geotiffFtype, ["metadata"]);


    let rainfallDayMapFileGroup = new FileGroup(new DisplayData("", "", "a"), [rainfallMapFile, metadataFile], [rfMmUnitsProperty]);
    let rainfallDayStationFileGroup = new FileGroup(new DisplayData("", "", "aa"), [stationFile], [rfMmUnitsProperty, fillProperty]);
    let rainfallMonthMapFileGroup = new FileGroup(new DisplayData("", "", "bb"), [rainfallMapFile], [rfMmUnitsProperty]);
    let rainfallMonthStationFileGroup = new FileGroup(new DisplayData("", "", "bc"), [stationFile], [rfMmUnitsProperty, fillProperty]);
    let prismClimatologyRainfallMonthFileGroup = new FileGroup(new DisplayData("", "", "b"), [prismClimatologyRainfallMapFile, metadataFile], [rfdsUnitsProperty, monthPrismClimatologyProperty]);
    let prismClimatologyRainfall30yrFileGroup = new FileGroup(new DisplayData("", "", "c"), [prismClimatologyRainfallMapFile, metadataFile], [rfdsUnitsProperty, yr30PrismClimatologyProperty]);
    let prismClimatologyTemperatureMonthFileGroup = new FileGroup(new DisplayData("", "", "d"), [prismClimatologyTemperatureMapFile, metadataFile], [tempdsUnitsProperty, monthPrismClimatologyProperty]);
    let prismClimatologyTemperature30yrFileGroup = new FileGroup(new DisplayData("", "", "e"), [prismClimatologyTemperatureMapFile, metadataFile], [tempdsUnitsProperty, yr30PrismClimatologyProperty]);

    let chelsaDsRainfallChangeFileGroup = new FileGroup(new DisplayData("", "", "k"), [dsRainfallMapChangeFile, metadataFile], [rfdsUnitsProperty, dsPeriodProperty]);
    let chelsaDsTemperatureChangeFileGroup = new FileGroup(new DisplayData("", "", "q"), [dsTemperatureMapChangeFile, metadataFile], [tempdsUnitsProperty, dsPeriodProperty]);

    //export items
    ////rainfall
    let rainfallDayExportItem = new ExportDatasetItem([rainfallDayMapFileGroup, rainfallDayStationFileGroup], {
      period: "day",
    }, "Daily Rainfall", rainfallDayTimeseriesData, this.requestFactory);
    let rainfallMonthExportItem = new ExportDatasetItem([rainfallMonthMapFileGroup, rainfallMonthStationFileGroup], {
      period: "month",
    }, "Monthly Rainfall", rainfallMonthTimeseriesData, this.requestFactory);
    let prismClimatologyRainfallMonthExportItem = new ExportDatasetItem([prismClimatologyRainfallMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Rainfall Climatologies", null, this.requestFactory);
    let prismClimatologyRainfall30yrExportItem = new ExportDatasetItem([prismClimatologyRainfall30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Rainfall Climatologies", null, this.requestFactory);


    let prismClimatologyMaxTemperatureMonthExportItem = new ExportDatasetItem([prismClimatologyTemperatureMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Maximum Temperature Climatologies", null, this.requestFactory);
    let prismClimatologyMaxTemperature30yrExportItem = new ExportDatasetItem([prismClimatologyTemperature30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Maximum Temperature Climatologies", null, this.requestFactory);

    let prismClimatologyMinTemperatureMonthExportItem = new ExportDatasetItem([prismClimatologyTemperatureMonthFileGroup], {
      mean_type: "mean_monthly"
    }, "PRISM Mean Monthly Minimum Temperature Climatologies", null, this.requestFactory);
    let prismClimatologyMinTemperature30yrExportItem = new ExportDatasetItem([prismClimatologyTemperature30yrFileGroup], {
      mean_type: "mean_30yr_annual"
    }, "PRISM Mean Annual 30 Year Minimum Temperature Climatologies", null, this.requestFactory);

    //DS
    let rfChelsaDSExportItems = [
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp126",
        season: "annual"
      }, "CHELSA Downscaled Annual Rainfall (SSP126)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "annual"
      }, "CHELSA Downscaled Annual Rainfall (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "annual"
      }, "CHELSA Downscaled Annual Rainfall (SSP585)", null, this.requestFactory),

      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp126",
        season: "wet"
      }, "CHELSA Downscaled Wet Season Rainfall (SSP126)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "wet"
      }, "CHELSA Downscaled Wet Season Rainfall (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "wet"
      }, "CHELSA Downscaled Wet Season Rainfall (SSP585)", null, this.requestFactory),

      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp126",
        season: "dry"
      }, "CHELSA Downscaled Dry Season Rainfall (SSP126)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "dry"
      }, "CHELSA Downscaled Dry Season Rainfall (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsRainfallChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "dry"
      }, "CHELSA Downscaled Dry Season Rainfall (SSP585)", null, this.requestFactory)
    ];

    let tempChelsaDSExportItems = [
      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "annual"
      }, "CHELSA Downscaled Annual Temperature (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "annual"
      }, "CHELSA Downscaled Annual Temperature (SSP585)", null, this.requestFactory),

      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "wet"
      }, "CHELSA Downscaled Wet Season Temperature (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "wet"
      }, "CHELSA Downscaled Wet Season Temperature (SSP585)", null, this.requestFactory),

      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp370",
        season: "dry"
      }, "CHELSA Downscaled Dry Season Temperature (SSP370)", null, this.requestFactory),
      new ExportDatasetItem([chelsaDsTemperatureChangeFileGroup], {
        dsm: "chelsa",
        model: "ssp585",
        season: "dry"
      }, "CHELSA Downscaled Dry Season Temperature (SSP585)", null, this.requestFactory)
    ];




    ////Datasets
    let rainfallExportDataset = new Dataset<ExportDatasetItem>(rainfallDatasetDisplayData, {
      location: "guam",
      datatype: "rainfall"
    }, periodOnlyFormData, [
      rainfallDayExportItem,
      rainfallMonthExportItem
    ]);

    let prismClimatologyRainfallExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyRainfallDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "rainfall"
    }, prismClimatologyExportFormData, [
      prismClimatologyRainfallMonthExportItem,
      prismClimatologyRainfall30yrExportItem
    ]);
    let prismClimatologyMaxTemperatureExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyMaxTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "max"
    }, prismClimatologyExportFormData, [
      prismClimatologyMaxTemperatureMonthExportItem,
      prismClimatologyMaxTemperature30yrExportItem
    ]);
    let prismClimatologyMinTemperatureExportDataset = new Dataset<ExportDatasetItem>(prismClimatologyMinTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "prism_climatology",
      variable: "air_temperature",
      aggregation: "min"
    }, prismClimatologyExportFormData, [
      prismClimatologyMinTemperatureMonthExportItem,
      prismClimatologyMinTemperature30yrExportItem
    ]);
    //DS
    let dsRainfallExportDataset = new Dataset<ExportDatasetItem>(dsRainfallDatasetDisplayData, {
      location: "guam",
      datatype: "downscaling_rainfall"
    }, dsRainfallExportFormData, rfChelsaDSExportItems);
    let dsTemperatureExportDataset = new Dataset<ExportDatasetItem>(dsTemperatureDatasetDisplayData, {
      location: "guam",
      datatype: "downscaling_temperature"
    }, dsTemperatureExportFormData, tempChelsaDSExportItems);



    ///////////////////////////////////////////////////////////////////
    ///////////// Create Dataset Groups and Form Managers /////////////
    ///////////////////////////////////////////////////////////////////
    let prismClimatologyGrouperDisplayData = new DisplayData("PRISM climatologies.", "PRISM Climatology", "prism_climatology");
    let dsGrouperDisplayData = new DisplayData("Future climate projections using downscaling prediction methods.", "Future Climate Projections", "downscaled");

    let datasetFormDisplayData = new DisplayData("Select the type of data you would like to view. Hover over an option for a description of the dataset.", "Dataset", "dataset");
    //vis dataset groups
    let visDatasets = [rainfallVisDataset, prismRainfallClimatologyVisDataset, prismMaxTemperatureClimatologyVisDataset, prismMinTemperatureClimatologyVisDataset, dsRainfallVisDataset, dsTemperatureVisDataset];
    let visDatasetSingles: Dataset<VisDatasetItem>[] = [rainfallVisDataset];
    let visDatasetGroupers: DatasetSelectorGroup[] = [
      new DatasetSelectorGroup(prismClimatologyGrouperDisplayData, [prismRainfallClimatologyVisDataset, prismMaxTemperatureClimatologyVisDataset, prismMinTemperatureClimatologyVisDataset]),
      new DatasetSelectorGroup(dsGrouperDisplayData, [dsRainfallVisDataset, dsTemperatureVisDataset])
    ];
    let visDatasetFormData = new DatasetFormData(datasetFormDisplayData, visDatasetSingles, visDatasetGroupers);

    //export dataset groups
    let exportDatasets = [rainfallExportDataset, prismClimatologyRainfallExportDataset, prismClimatologyMaxTemperatureExportDataset, prismClimatologyMinTemperatureExportDataset, dsRainfallExportDataset, dsTemperatureExportDataset];
    let exportDatasetSingles: Dataset<ExportDatasetItem>[] = [rainfallExportDataset];
    let exportDatasetGroupers: DatasetSelectorGroup[] = [
      new DatasetSelectorGroup(prismClimatologyGrouperDisplayData, [prismClimatologyRainfallExportDataset, prismClimatologyMaxTemperatureExportDataset, prismClimatologyMinTemperatureExportDataset]),
      new DatasetSelectorGroup(dsGrouperDisplayData, [dsRainfallExportDataset, dsTemperatureExportDataset])
    ];
    let exportDatasetFormData = new DatasetFormData(datasetFormDisplayData, exportDatasetSingles, exportDatasetGroupers);

    //default values for each node
    let defaultVisState = {
      datatype: "rainfall",
      period: "day",
      fill: "partial"
    };
    let defaultExportState = {
      datatype: "rainfall",
      period: "day",
      fill: "partial"
    };
    //create form managers
    this._visFormManager = new FormManager(visDatasets, visDatasetFormData, defaultVisState);
    this._exportFormManager = new FormManager(exportDatasets, exportDatasetFormData, defaultExportState);
  }

  get visFormManager(): FormManager<VisDatasetItem> {
    return this._visFormManager;
  }

  get exportFormManager(): FormManager<ExportDatasetItem> {
    return this._exportFormManager;
  }
}









































































export type ActiveFormData<T extends DatasetItem> = {
  datasetFormData: DatasetFormData,
  datasetItem: T,
  values: StringMap
}


export class DatasetFormData {
  private _displayData: DisplayData;
  private _datasetValues: FormValue[];
  private _groupers: DatasetSelectorGroup[];

  constructor(displayData: DisplayData, datasets: Dataset<DatasetItem>[], datasetGroups: DatasetSelectorGroup[]) {
    this._displayData = displayData;
    this._datasetValues = datasets.map((dataset: Dataset<DatasetItem>) => {
      return new FormValue(dataset.displayData, dataset.paramData, [true, true]);
    });
    this._groupers = datasetGroups;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get datasetValues(): FormValue[] {
    return this._datasetValues;
  }

  get datasetGroups(): DatasetSelectorGroup[] {
    return this._groupers;
  }
}

export class DatasetSelectorGroup {
  private _displayData: DisplayData;
  private _values: DisplayData[];

  constructor(displayData: DisplayData, datasets: Dataset<DatasetItem>[]) {
    this._values = datasets.map((dataset: Dataset<DatasetItem>) => {
      return dataset.displayData;
    });
    this._displayData = displayData;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get values(): DisplayData[] {
    return this._values;
  }
}

export class FormData {
  private _default: FormNode[];
  private _categorized: FormCategory[];

  constructor(defaultNodes: FormNode[], categorizedNodes: FormCategory[]) {
    this._default = defaultNodes;
    this._categorized = categorizedNodes;
  }

  get default(): FormNode[] {
    return this._default;
  }

  get categorized(): FormCategory[] {
    return this._categorized;
  }

  private filterNodes(values: any, nodes: FormNode[]) {
    return nodes.map((node: FormNode) => {
      let tag = node.tag;
      let valueTags = values[tag];
      if(!Array.isArray(valueTags)) {
        valueTags = [valueTags];
      }
      return node.filter(valueTags);
    });
  }

  public filter(values: any): FormData {
    let filteredDefault = this.filterNodes(values, this._default);
    let filteredCategorized = this._categorized.map((category: FormCategory) => {
      let nodes = this.filterNodes(values, category.nodes);
      return new FormCategory(category.displayData, nodes);
    });
    return new FormData(filteredDefault, filteredCategorized);
  }

  public flatten(): FormNode[] {
    let nodes = [...this._default];
    for(let category of this._categorized) {
      nodes = nodes.concat(category.nodes);
    }
    return nodes;
  }
}


//each dataset has a specific set of fields, define the entire set of fields and values, specific items can have subsets that are valid for it (all descriptions etc must be the same)
//dataset fields can be bound together by using the same tags
//each individual item will just have a tag map
//what properties are dataset specific?
class Dataset<T extends DatasetItem> {
  private _displayData: DisplayData;
  private _formData: FormData;
  private _fields: string[];
  private _itemMap: any;
  private _paramData: StringMap;

  constructor(displayData: DisplayData, paramData: StringMap, formData: FormData, items: T[]) {
    this._fields = [];
    for(let node of formData.default) {
      this._fields.push(node.tag);
    }
    for(let category of formData.categorized) {
      for(let node of category.nodes) {
        this._fields.push(node.tag);
      }
    }
    this._formData = formData;
    this._displayData = displayData;
    this._paramData = paramData;
    this._itemMap = {};
    for(let item of items) {
      this.addItem(item);
    }
  }

  private addItem(item: T) {
    item.dataset = this;
    let values = item.values;
    let tree = this._itemMap;
    let i: number;
    for(i = 0; i < this._fields.length - 1; i++) {
      let field = this._fields[i];
      let value = values[field];
      let next = tree[value];
      if(next === undefined) {
        next = {};
        tree[value] = next;
      }
      tree = next;
    }
    //leaf node should ne the dataset item
    let field = this._fields[i];
    let value = values[field];
    tree[value] = item;
  }

  get formData(): FormData {
    return this._formData;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get paramData(): StringMap {
    return this._paramData;
  }

  public getStateData(state: StringMap): StateData<T> {
    //retrieve corrected state, the dataset item associated with it, and form data
    let correctedState = Object.assign({}, state);
    let validValues = {};
    let tree = this._itemMap;
    for(let field of this._fields) {
      //get form data (valid values for subtree)
      let fieldValues = Object.keys(tree);
      validValues[field] = fieldValues;

      let stateValue = state[field];
      let next = tree[stateValue];
      if(next === undefined) {
        let validStateValue = fieldValues[0];
        correctedState[field] = validStateValue;
        next = tree[validStateValue];
      }
      tree = next;
    }
    //leaf node is the dataset item
    let datasetItem: T = tree;
    //check if form info cached in item
    if(datasetItem.formData === null) {
      let filteredFormData = this.formData.filter(validValues);
      //cache form data in the item so don't have to recompute if same combination selected, can use this field to retrieve form data in caller
      datasetItem.formData = filteredFormData;
    }

    //process form data into FormData object by filtering values
    return {
      //leaf node is the dataset item
      item: datasetItem,
      state: correctedState
    }
  }
}

type StateData<T extends DatasetItem> = {
  item: T,
  state: StringMap
}


export abstract class DatasetItem {
  private _fieldData: {[tag: string]: DisplayData};
  private _rasterParams: StringMap;
  private _stationParams: StringMap;
  private _baseParams: StringMap;
  private _values: StringMap;
  private _formData: FormData;
  private _label: string;
  private _timeseriesData: TimeseriesData;
  private _requestFactory: RequestFactoryService

  constructor(values: StringMap, label: string, timeseriesData: TimeseriesData, requestFactory: RequestFactoryService) {
    this._values = values;
    this._formData = null;
    this._label = label;
    this._timeseriesData = timeseriesData;
    this._requestFactory = requestFactory;
  }

  get timeseriesData(): TimeseriesData {
    return this._timeseriesData;
  }

  get formData(): FormData {
    return this._formData;
  }

  set formData(formData: FormData) {
    this._formData = formData;
  }

  get values(): StringMap {
    return this._values;
  }

  get rasterParams(): StringMap {
    return this._rasterParams;
  }

  get stationParams(): StringMap {
    return this._stationParams;
  }

  get baseParams(): StringMap {
    return this._baseParams;
  }

  get label(): string {
    return this._label;
  }

  get coverageLabel(): string {
    return this.timeseriesData?.coverageLabel;
  }

  get start(): Moment {
    return this._timeseriesData?.start;
  }

  get end(): Moment {
    return this._timeseriesData?.end;
  }

  get unit(): UnitOfTime {
    return this._timeseriesData?.unit;
  }

  get interval(): number {
    return this._timeseriesData?.interval;
  }

  get period(): PeriodData {
    return this._timeseriesData?.period;
  }

  set dataset(dataset: Dataset<DatasetItem>) {
    this._baseParams = Object.assign({}, dataset.paramData);
    this._rasterParams = Object.assign({}, dataset.paramData);
    this._stationParams = Object.assign({}, dataset.paramData);
    this._fieldData = {
      dataset: dataset.displayData
    };
    dataset.formData.default.forEach(this._setNodeData.bind(this));
    for(let category of dataset.formData.categorized) {
      category.nodes.forEach(this._setNodeData.bind(this));
    }
    if(this._timeseriesData) {
      this._requestFactory.getDatasetDateRange(this._rasterParams).then(async (dateRange: RequestResults) => {
        this._timeseriesData.dateRange = await dateRange.toPromise();
      });
    }
  }

  private _setNodeData(node: FormNode) {
    let valueTag = this.values[node.tag];
    //get value data for item that matches the tag for this item
    let valueData = node.values.find((value: FormValue) => {
      return value.tag == valueTag;
    });
    this._baseParams = Object.assign(this._baseParams, valueData.paramData);
    if(valueData.applicability[0]) {
      this._rasterParams = Object.assign(this._rasterParams, valueData.paramData);
    }
    if(valueData.applicability[1]) {
      this._stationParams = Object.assign(this._stationParams, valueData.paramData);
    }
    this._fieldData[node.tag] = valueData.displayData;
  }

  getFieldLabel(field: string): string {
    return this._fieldData[field].label;
  }

  getFieldDescription(field: string): string {
    return this._fieldData[field].description;
  }
}


export class VisDatasetItem extends DatasetItem {
  private _includeStations: boolean;
  private _includeRaster: boolean;
  private _units: string;
  private _unitsShort: string;
  private _dataRange: [number, number];
  private _rangeAbsolute: [boolean, boolean];
  private _reverseColors: boolean;
  private _datatype: string;
  private _timeseriesSet: TimeseriesData[];
  private _optionData: OptionData;

  constructor(includeStations: boolean, includeRaster: boolean, units: string, unitsShort: string, datatype: string, label: string, dataRange: [number, number], rangeAbsolute: [boolean, boolean], focusTimeseries: TimeseriesData, timeseriesSet: TimeseriesData[], reverseColors: boolean, values: StringMap, optionData: OptionData, requestFactory: RequestFactoryService) {
    super(values, label, focusTimeseries, requestFactory);
    this._includeRaster = includeRaster;
    this._includeStations = includeStations;
    this._units = units;
    this._unitsShort = unitsShort;
    this._dataRange = dataRange;
    this._rangeAbsolute = rangeAbsolute;
    this._reverseColors = reverseColors;
    this._datatype = datatype;
    this._timeseriesSet = timeseriesSet;
    this._optionData = optionData;
  }

  get optionData(): OptionData {
    return this._optionData;
  }

  get dataypeLabel(): string {
    let label = this._datatype;
    if(this.displayStyle !== "standard") {
      label += " Change";
    }
    return label;
  }

  get datatype(): string {
    return this._datatype;
  }

  get includeStations(): boolean {
    return this._includeStations;
  }

  get includeRaster(): boolean {
    return this._includeRaster;
  }

  get units(): string {
    return this._optionData?.unitData.unit || this._units;
  }

  get unitsShort(): string {
    return this._optionData?.unitData.short || this._unitsShort;
  }

  get dataRange(): [number, number] {
    return this._optionData?.unitData.range || this._dataRange;
  }

  get displayStyle(): DisplayStyle {
    return this._optionData?.displayStyle || "standard";
  }

  get rangeAbsolute(): [boolean, boolean] {
    return this._rangeAbsolute;
  }

  get reverseColors(): boolean {
    return this._reverseColors;
  }

  get timeseriesSet(): TimeseriesData[] {
    return this._timeseriesSet;
  }
}

export type UnitOfTime = "year" | "month" | "day" | "hour" | "minute" | "second";

export class Form {
  node: FormNode
}

export interface ViewDataMap {
  [view: string]: ViewData
}

export interface ViewData {
  displayStyle: DisplayStyle,
  units: {
    [unit: string]: UnitData
  }
}
export interface UnitData {
  unit: string
  short: string,
  range: [number, number]
}


export class OptionData {
  private _typeNode: FormNode;
  private unitMap: {[type: string]: FormNode};
  private _viewDataMap: ViewDataMap;
  private _type: string;
  private _unit: string;

  //valid combos of options, use to create stripped down nodes
  constructor(typeNode: FormNode, unitMap: {[type: string]: FormNode}, viewDataMap: ViewDataMap, defaultType: string, defaultUnit: string) {
    this._typeNode = typeNode;
    this.unitMap = unitMap;
    this._viewDataMap = viewDataMap;
    this._type = defaultType;
    this._unit = defaultUnit;
  }

  public getUnitNode(type: string) {
    return this.unitMap[type];
  }

  get unitNode(): FormNode {
    return this.getUnitNode(this._type);
  }

  get displayStyle() {
    return this._viewDataMap[this._type].displayStyle;
  }

  get unitData() {
    return this._viewDataMap[this._type].units[this.unit];
  }
  get typeNode(): FormNode {
    return this._typeNode;
  }

  get type(): string {
    return this._type;
  }

  get unit(): string {
    return this._type == "percent"? "percent" : this._unit;
  }

  set type(type: string) {
    this._type = type;
  }

  set unit(unit: string) {
    this._unit = unit;
  }

  get paramData(): StringMap {
    let valueParamData = this._typeNode.values.filter((value: FormValue) => {
      return value.tag == this._type;
    })[0].paramData;
    let unitParamData = {};
    if(this.unitNode) {
      unitParamData = this.unitNode.values.filter((value: FormValue) => {
        return value.tag == this._unit;
      })[0].paramData;
    }

    return {
      ...valueParamData,
      ...unitParamData
    };
  }
}

export class PeriodData {
  private _unit: UnitOfTime;
  private _interval: number;
  private _tag: string;

  constructor(unit: UnitOfTime, interval: number, tag: string) {
    this._unit = unit;
    this._interval = interval;
    this._tag = tag;
  }

  get unit(): UnitOfTime {
    return this._unit;
  }

  get interval(): number {
    return this._interval;
  }

  get tag(): string {
    return this._tag;
  }
}



export class TimeseriesData {
  private _start: Moment;
  private _end: Moment;
  private _period: PeriodData;
  private _nextPeriod: PeriodData;
  private _dateHandler: DateManagerService;
  private _coverageLabel: string;
  private _defaultValue: Moment;

  constructor(period: PeriodData, nextPeriod: PeriodData, dateHandler: DateManagerService) {
    this._period = period;
    this._nextPeriod = nextPeriod;
    this._dateHandler = dateHandler;
    //set default range past current so default dates will stick to end
    //update in the year 10000
    this.dateRange = ["9999-01-01", "9999-01-01"];
  }

  expandDates(start: Moment, end: Moment) {
    let date = this.roundToInterval(start);
    end = this.roundToInterval(end);
    let dates = [];
    while(date.isSameOrBefore(end)) {
      dates.push(date.clone());
      date = this.addInterval(date, 1, false);
    }
    return dates;
  }

  addInterval(time: Moment, n: number = 1, lock: boolean = true): Moment {
    let result = this.roundToInterval(time);
    result.add(n * this.interval, this.unit);
    if(lock) {
      result = this.lockToRange(result);
    }
    return result;
  }

  roundToInterval(time: Moment) {
    let base = this._start.clone();
    let timeClone = time.clone();
    let intervalDiff = timeClone.diff(base, this.unit) / this.interval;
    let roundedDiff = Math.round(intervalDiff) * this.interval;
    base.add(roundedDiff, this.unit);
    base = this.lockToRange(base);
    return base;
  }

  lockToRange(time: Moment) {
    let res: Moment = time;
    if(time.isBefore(this._start)) {
      res = this._start.clone();
    }
    else if(time.isAfter(this._end)) {
      res = this._end.clone();
    }
    return res;
  }

  getLabel(date: Moment, fancy: boolean = true): string {
    return `${this._dateHandler.dateToString(date, this._period.unit, fancy)}`;
  }

  set dateRange(range: [string, string]) {
    let [start, end] = range;
    this._start = moment(start).tz("Pacific/Guam");
    this._end = moment(end).tz("Pacific/Guam");
    this._defaultValue = this._end.clone();
    this._coverageLabel = `${this._dateHandler.dateToString(this._start, this._period.unit, true)} - ${this._dateHandler.dateToString(this._end, this._period.unit, true)}`;
  }

  get coverageLabel(): string {
    return this._coverageLabel;
  };

  get defaultValue(): Moment {
    return this._defaultValue;
  }

  get start(): Moment {
    return this._start;
  }

  get end(): Moment {
    return this._end;
  }

  get unit(): UnitOfTime {
    return this._period.unit;
  }

  get interval(): number {
    return this._period.interval;
  }

  get period(): PeriodData {
    return this._period;
  }

  get nextPeriod(): PeriodData {
    return this._nextPeriod;
  }
}




export class FormCategory {
  private _displayData: DisplayData;
  private _nodes: FormNode[];

  constructor(displayData: DisplayData, nodes: FormNode[]) {
    this._displayData = displayData;
    this._nodes = nodes;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get nodes(): FormNode[] {
    return this._nodes;
  }
}

//note use "true" and "false" as special value tags for toggles
export class FormNode {
  private _displayData: DisplayData
  private _values: FormValue[];
  private _defaultValue: FormValue;

  constructor(displayData: DisplayData, values: FormValue[], defaultValue: FormValue = null) {
    this._displayData = displayData;
    this._values = values;
    this._defaultValue = defaultValue;
  }

  get defaultValue(): FormValue {
    return this._defaultValue;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get values(): FormValue[] {
    return this._values;
  }

  public filter(valueTags: string[], defaultValue?: string): FormNode {
    let tagSet = new Set(valueTags);
    if(defaultValue === undefined && this._defaultValue !== null) {
      defaultValue = this._defaultValue.tag;
    }
    let newDefault = null;
    let filteredValues = this._values.filter((value: FormValue) => {
      if(defaultValue !== undefined && value.tag == defaultValue) {
        newDefault = value;
      }
      return tagSet.has(value.tag);
    });
    return new FormNode(this._displayData, filteredValues, newDefault);
  }
}

export class FormValue {
  private _displayData: DisplayData;
  private _paramData: StringMap;
  private _applicability: [boolean, boolean];

  constructor(displayData: DisplayData, paramData: StringMap, applicability: [boolean, boolean]) {
    this._displayData = displayData;
    this._paramData = paramData;
    this._applicability = applicability;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get paramData(): StringMap {
    return this._paramData;
  }

  get applicability(): [boolean, boolean] {
    return this._applicability
  }
}

export class DisplayData {
  private _description: string;
  private _label: string;
  private _tag: string;

  constructor(description: string, label: string, tag: string) {
    this._description = description;
    this._label = label;
    this._tag = tag;
  }

  get description(): string {
    return this._description;
  }

  get label(): string {
    return this._label;
  }

  get tag(): string {
    return this._tag;
  }
}



//display data tag should be the type for the file sent to API
export class FileData {
  private _displayData: DisplayData;
  private _fileType: FileType;
  private _requires: string[];

  constructor(displayData: DisplayData, fileType: FileType, requires: string[]) {
    this._displayData = displayData;
    this._fileType = fileType;
    this._requires = requires;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

  get fileType(): FileType {
    return this._fileType;
  }

  get requires(): string[] {
    return this._requires;
  }
}

export class FileProperty {
  private _formData: FormNode;
  private _defaultValues: string[];

  constructor(formData: FormNode, defaultValues: string[]) {
    this._formData = formData;
    this._defaultValues = defaultValues;
  }

  get formData(): FormNode {
    return this._formData;
  }

  get defaultValues(): string[] {
    return this._defaultValues;
  }
}

class FileType {
  private _type: string;
  private _ext: string;
  private _description: string;

  constructor(type: string, ext: string, description: string) {
    this._type = type;
    this._ext = ext;
    this._description = description;
  }

  get type(): string {
    return this._type;
  }

  get ext(): string {
    return this._ext;
  }

  get description(): string {
    return this._description;
  }
}

export class FileGroup {
  private _fileData: FileData[];
  private _displayData: DisplayData;
  private _additionalProperties: FileProperty[];

  constructor(displayData: DisplayData, fileData: FileData[], additionalProperties: FileProperty[]) {
    this._fileData = fileData;
    this._displayData = displayData;
    this._additionalProperties = additionalProperties;
  }

  get description(): string {
    return this._displayData.description;
  }

  get label(): string {
    return this._displayData.label;
  }

  get tag(): string {
    return this._displayData.tag;
  }

  get displayData(): DisplayData {
    return this._displayData;
  }

   get fileData(): FileData[] {
    return this._fileData;
   }

   get additionalProperties(): FileProperty[] {
    return this._additionalProperties;
   }
}


//just make a separate structure for export, there are differences
//this doesn't need any separation so just have date range or no date range
//add period to additional properties in a file group is you want to allow multiples
export class ExportDatasetItem extends DatasetItem {
  private _fileGroups: FileGroup[];

  constructor(fileGroups: FileGroup[], values: StringMap, label: string, timeseriesData: TimeseriesData, requestFactory: RequestFactoryService) {
    super(values, label, timeseriesData, requestFactory);
    this._fileGroups = fileGroups;
  }

  get fileGroups(): FileGroup[] {
    return this._fileGroups;
  }
}




export class FormManager<T extends DatasetItem> {
  private _datasetFormData: DatasetFormData;
  private _datasets: {[tag: string]: Dataset<T>};
  private _values: StringMap;
  private _activeItem: T;
  private _state: StringMap;
  private _defaultState: StringMap;

  constructor(datasets: Dataset<T>[], datasetFormData: DatasetFormData, defaultState: StringMap) {
    this._defaultState = defaultState;
    this._state = Object.assign({}, defaultState);
    this._datasets = {};
    for(let dataset of datasets) {
      this._datasets[dataset.tag] = dataset;
    }
    this._datasetFormData = datasetFormData;
    this.updateState();
  }

  private updateState(): void {
    let dataset = this._datasets[this._state.datatype];
    let stateData = dataset.getStateData(this._state);
    this._state = stateData.state;
    this._activeItem = stateData.item;
    this._values = Object.assign({
      datatype: dataset.tag
    }, this._activeItem.values)
  }

  public resetState(): void {
    this._state = Object.assign({}, this._defaultState);
    this.updateState();
  }

  public setValue(field: string, tag: string): ActiveFormData<T> {
    if(field == "datatype") {
      return this.setDatatype(tag);
    }
    else {
      this._state[field] = tag;
      this.updateState();
      return this.getFormData();
    }
  }

  public setValues(values: StringMap): ActiveFormData<T> {
    Object.assign(this._state, values);
    this.updateState();
    return this.getFormData();
  }

  public setDatatype(tag: string): ActiveFormData<T> {
    if(this._datasets[tag]) {
      this._state["datatype"] = tag;
      this.updateState();
    }
    return this.getFormData();
  }

  public getFormData(): ActiveFormData<T> {
    return {
      datasetFormData: this._datasetFormData,
      datasetItem: this._activeItem,
      values: this._values
    };
  }
}

export type DisplayStyle = "diverging" | "standard" | "increasing";
