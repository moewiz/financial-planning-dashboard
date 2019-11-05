import React, { useState } from 'react';
import { connect } from 'formik';
import { SliderValue } from 'antd/lib/slider';

import { StepWrapper } from '../styled';
import { StepCurrentPosition, StepPositionLeft, StepPositionRight } from '../PresentationStep2/styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import EventsBlock from './EventsBlock';
import SlidersBlock from './SlidersBlock';
import ChartsBlock from './ChartsBlock';

export const chartsDataResources = {
  60: {
    netAssetsChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [1050000, 1122713, 1199330, 1280642, 1369331, 1355235, 1340951, 1326499, 1311901, 1295469],
    },
    cashflowChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [82675, 84998, 87452, 92415, 73932, 75199, 76495, 77821, 79178, 80565],
    },
    taxChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [33289, 35019, 36758, 36135, 0, 0, 0, 0, 0, 0],
    },
    calmPVChartData: {
      xAxis: [
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
      ],
      netAssets: [
        600000,
        629710,
        660561,
        693132,
        729664,
        671478,
        614377,
        558347,
        503378,
        448066,
        392256,
        346274,
        305315,
        267300,
        232063,
        197955,
        163840,
        129452,
        94668,
        59479,
      ],
      expenditure: [
        106368,
        109396,
        112465,
        113204,
        73676,
        74929,
        76210,
        77520,
        78860,
        80231,
        81633,
        83067,
        84534,
        86034,
        88403,
        90531,
        92638,
        94698,
        96808,
        100316,
      ],
      inflow: [
        120000,
        124200,
        128547,
        133046,
        0,
        0,
        0,
        0,
        0,
        0,
        13279,
        20659,
        25480,
        30226,
        33640,
        35227,
        36407,
        37344,
        38305,
        39292,
      ],
      total: [
        120000,
        124200,
        128547,
        133046,
        73676,
        74929,
        76210,
        77520,
        78860,
        80231,
        81633,
        83067,
        84534,
        86034,
        88403,
        90531,
        92638,
        94698,
        96808,
        100316,
      ],
    },
  },
  65: {
    netAssetsChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [1050000, 1122713, 1199330, 1280642, 1369331, 1463251, 1566568, 1676107, 1791131, 1912286],
    },
    cashflowChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [82675, 84998, 87452, 92415, 95016, 101592, 104733, 107576, 110912, 80565],
    },
    taxChartData: {
      xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
      value: [37325, 39202, 41095, 40631, 42687, 40930, 42778, 45098, 47105, 0],
    },
    calmPVChartData: {
      xAxis: [
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
      ],
      netAssets: [
        600000,
        629710,
        660561,
        693132,
        729664,
        767885,
        811219,
        856509,
        902899,
        950727,
        895487,
        841318,
        788210,
        736153,
        685138,
        634910,
        584227,
        533078,
        483612,
        437579,
      ],
      expenditure: [
        106368,
        109396,
        112465,
        113204,
        73676,
        74929,
        76210,
        77520,
        78860,
        80231,
        81633,
        83067,
        84534,
        86034,
        88403,
        90531,
        92638,
        94698,
        96808,
        100316,
      ],
      inflow: [
        120000,
        124200,
        128547,
        133046,
        0,
        0,
        0,
        0,
        0,
        0,
        13279,
        20659,
        25480,
        30226,
        33640,
        35227,
        36407,
        37344,
        38305,
        39292,
      ],
      total: [
        120000,
        124200,
        128547,
        133046,
        73676,
        74929,
        76210,
        77520,
        78860,
        80231,
        81633,
        83067,
        84534,
        86034,
        88403,
        90531,
        92638,
        94698,
        96808,
        100316,
      ],
    },
  },
};

const PresentationStep3 = (props: FormikPartProps) => {
  const [chartsData, setChartsData] = useState(chartsDataResources['60']);
  const onChangeRetirementYear = (retirementYear: SliderValue) => {
    console.log('retirementYear', retirementYear)
    if (retirementYear === 65) {
      setChartsData(chartsDataResources['65']);
    }
  };

  return (
    <StepWrapper>
      <StepCurrentPosition>
        <StepPositionLeft style={{ flex: '0 0 295px', padding: '15px', border: '1px solid #dedede' }}>
          <SlidersBlock onChangeRetirementYear={onChangeRetirementYear} />
          <EventsBlock />
        </StepPositionLeft>
        <StepPositionRight>
          <ChartsBlock chartsData={chartsData} />
        </StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep3);
