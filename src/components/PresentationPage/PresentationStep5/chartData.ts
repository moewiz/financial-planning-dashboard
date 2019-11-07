const generalData = {
  netAssetsChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [1050000, 1122713, 1199330, 1280642, 1369331, 1355235, 1340951, 1326499, 1311901, 1295469],
    proposed: [1050000, 1121674, 1208318, 1301007, 1400133, 1419727, 1421591, 1421534, 1419395, 1415002],
  },
  cashflowChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [82675, 84998, 87452, 92415, 73932, 75199, 76495, 77821, 79178, 80565],
    proposed: [88279, 90775, 93357, 98387, 68985, 70220, 71483, 72773, 74093, 75441],
  },
  taxChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [33289, 35019, 36758, 36135, 0, 0, 0, 0, 0, 0],
    proposed: [31721, 33425, 35190, 34659, 0, 0, 0, 0, 0, 0],
  },
  calmPVChartData: {
    xAxis: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
    netAssets: [
      600000,
      610000,
      615000,
      627494,
      662995,
      620853,
      577664,
      533387,
      487982,
      441405,
      393613,
      355100,
      320555,
      288007,
      257355,
      227978,
      198528,
      168463,
      137607,
      106285,
    ],
    expenditure: [
      109321,
      112594,
      115968,
      117088,
      69173,
      70420,
      71696,
      73000,
      74334,
      75698,
      77093,
      78519,
      79978,
      81469,
      83709,
      86163,
      88423,
      90615,
      92756,
      91735,
    ],
    income: [
      120000,
      124200,
      128547,
      133046,
      69173,
      70420,
      71696,
      73000,
      74334,
      75698,
      77093,
      78519,
      79978,
      81469,
      83709,
      86163,
      88423,
      90615,
      66636,
      40092,
    ],
  },
};

export const chartsDataResourcesWithLifeEvent = {
  60: generalData,
  // 65: generalData,
};

export const chartsDataResources = {
  60: generalData,
  // 65: generalData,
};

const withoutSalarySacrificeData = {
  netAssetsChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [1050000, 1122713, 1199330, 1280642, 1369331, 1355235, 1340951, 1326499, 1311901, 1295469],
    proposed: [1050000, 1112970, 1196147, 1285106, 1380356, 1405663, 1406553, 1405460, 1402217, 1396648],
  },
  cashflowChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [82675, 84998, 87452, 92415, 73932, 75199, 76495, 77821, 79178, 80565],
    proposed: [83954, 86298, 88847, 93924, 68985, 70220, 71483, 72773, 74093, 75441],
  },
  taxChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [33289, 35019, 36758, 36135, 0, 0, 0, 0, 0, 0],
    proposed: [36046, 37902, 39700, 39122, 0, 0, 0, 0, 0, 0],
  },
  calmPVChartData: {
    xAxis: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
    netAssets: [
      530000,
      552791,
      576289,
      601037,
      627080,
      583763,
      539360,
      493830,
      447130,
      399216,
      350044,
      313029,
      280419,
      249706,
      220347,
      190637,
      160322,
      136861,
      115062,
      93182,
    ],
    expenditure: [
      103646,
      106720,
      109766,
      110463,
      69173,
      70420,
      71696,
      73000,
      74334,
      75698,
      77093,
      78519,
      79978,
      82081,
      84261,
      86451,
      77465,
      76015,
      78119,
      81090,
    ],
    inflowCapital: [
      120000,
      124200,
      128547,
      133046,
      69173,
      70420,
      71696,
      73000,
      74334,
      75698,
      77093,
      78519,
      79978,
      82081,
      84261,
      86451,
      77465,
      76015,
      78119,
      81090,
    ],
  },
};

export const chartsDataResourcesWithoutSalarySacrifice = {
  60: withoutSalarySacrificeData,
  // 65: generalData,
};

const withoutSalarySacrificeNInsuranceWithLifeEventData = {
  netAssetsChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [1550000, 1545761, 1540766, 1534983, 1528379, 1520921, 1512575, 1503305, 1493077, 1481852],
    proposed: [1050000, 1038595, 1081096, 1134731, 1122408, 1110013, 1094930, 1076954, 1055868, 1031441],
  },
  cashflowChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    proposed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  taxChartData: {
    xAxis: ['57', '58', '59', '60', '61', '62', '63', '64', '65', '66'],
    current: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    proposed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  calmPVChartData: {
    xAxis: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
    netAssets: [
      530000,
      480087,
      482763,
      494563,
      444445,
      395335,
      344918,
      293147,
      239969,
      185332,
      129182,
      92871,
      59325,
      25004,
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    expenditure: [
      64453,
      65723,
      66926,
      68130,
      69361,
      70620,
      71909,
      73227,
      74575,
      75955,
      77366,
      78810,
      80287,
      81797,
      84292,
      85047,
      86940,
      88879,
      90861,
      92891,
    ],
    incomeCapital: [
      64453,
      65723,
      66926,
      68130,
      69361,
      70620,
      71909,
      73227,
      74575,
      75955,
      77366,
      78810,
      80287,
      67340,
      35552,
      35494,
      36407,
      37344,
      38305,
      39292,
    ],
  },
};

export const chartsDataResourcesWithoutSalarySacrificeNInsuranceWithLifeEvent = {
  60: withoutSalarySacrificeNInsuranceWithLifeEventData,
  // 65: generalData,
};
