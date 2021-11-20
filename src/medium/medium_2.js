import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvg(mpg_data),
    allYearStats: getAllYearStats(mpg_data),
    ratioHybrids: getRatioHybrids(mpg_data)
};

export function getAvg(array) {
    const city = [];
    for (let i=0; i<array.length; i++) {
        city.push(array[i].city_mpg);
    }
    var city_avg = getStatistics(city).mean;

    const highway = [];
    for (let i=0; i<array.length; i++) {
        highway.push(array[i].highway_mpg);
    }
    var highway_avg = getStatistics(highway).mean;

    const result = {city: city_avg, highway: highway_avg};
    return result;
};

export function getAllYearStats(array) {
    const year = [];
    for (let i=0; i<array.length; i++) {
        year.push(array[i].year);
    }

    return getStatistics(year);
};

export function getRatioHybrids(array) {
    const isHybrid = [];
    for (let i=0; i<array.length; i++) {
        isHybrid.push(array[i].hybrid);
    }

    let count = 0;
    for (let i=0; i<isHybrid.length; i++) {
        if (isHybrid[i] == true) {
            count ++;
        }
    }
    return count/mpg_data.length;
};
/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: function(array) {
        const result = [];
        const make_temp = [];
        for (let i=0; i<array.length; i++) {
            make_temp.push(array[i].make);
        }
        const ma = [... new Set(make_temp)];
        for (let i=0; i<ma.length; i++) {
            var make_string = ma[i];
            const id_arr = [];
            for (let j=0; j<array.length; j++) {
                if (array[j].make == ma[i]) {
                    id_arr.push(array[j].id);
                }
            }
            result.push({make: make_string, hybrids: id_arr});
        }
        result.sort(function(a, b) {
            return b.hybrids.length - a.hybrids.length;
          });
        return result;
},
        avgMpgByYearAndHybrid: function(array) {
            const result = {};

            const year_temp = [];
            for (let i=0; i<array.length; i++) {
                make_temp.push(array[i].year);
            }
            const ye = [... new Set(make_temp)];

            for (let i=0; i<ye.length; i++) {
                let year_num = ye[i];

                const arr_hyb = [];
                const arr_nonhyb = [];
                for (let j=0; j<array.length; j++) {
                    if (array[j].year == year_num && array[j].hybrid == true) {
                        arr_hyb.push(array[j]);
                    } else if (array[j].year == year_num) {
                        arr_nonhyb.push(array[j]);
                    }
                }

                const hybrid_avg = allCarStats.avgMpg(arr_hyb);
                const notHybrid_avg = allCarStats.avgMpg(arr_nonhyb);

                result[ye[i]] = {hybrid: hybrid_avg, notHybrid: notHybrid_avg};
            }

            return result;
        }
};
