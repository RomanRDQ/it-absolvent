import {
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  Typography,
} from '@mui/material'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@mui/material/styles'
import { theme, themeMUI } from '../theme'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import styled from 'styled-components'

const maxAmount = 100_000_000
const maxRate = 20
const maxYears = 35
const maxInflation = 100

const calculateMonthlyPayment = (amount: number, rate: number, years: number) => {
  const dataAmount = amount ? amount : 0
  const monthlyRate = rate ? rate / 100 / 12 : 0
  const time = years ? years * 12 : 0
  if (amount && rate && years !== 0) {
    return (
      Math.round(
        ((dataAmount * monthlyRate * Math.pow(1 + monthlyRate, time)) /
          (Math.pow(1 + monthlyRate, time) - 1)) *
          100
      ) / 100
    )
  } else {
    return 0
  }
}

const calculateMortgage = (amount: number, rate: number, years: number) => {
  const monthlyPayment = Math.round(calculateMonthlyPayment(amount, rate, years))
  let remain = amount
  const rowData = Array.from({ length: years * 12 }, (v, i) => i + 1).map(() => {
    const monthlyInterestPayment = Math.round((rate / 100 / 12) * remain)
    const monthlyPrincipalPayment = Math.round(monthlyPayment - monthlyInterestPayment)
    remain -= monthlyPrincipalPayment

    return {
      monthlyInterestPayment: monthlyInterestPayment,
      monthlyPrincipalPayment: monthlyPrincipalPayment,
      remain: remain,
    }
  })

  return {
    monthlyPayment: monthlyPayment,
    rowData: rowData,
  }
}

const calculateAnnualMortgage = (arg: {
  amount: number
  rate: number
  years: number
  inflation: number
}) => {
  const annualPayment = Math.round(calculateMonthlyPayment(arg.amount, arg.rate, arg.years) * 12)
  let remain = arg.amount
  const rowAnnualData = Array.from({ length: arg.years }, (v, i) => i + 1).map(() => {
    const annualInterestPayment = Math.round((arg.rate / 100) * remain)
    const annualPrincipalPayment = Math.round(annualPayment - annualInterestPayment)
    remain -= annualPrincipalPayment

    return {
      annualInterestPayment: annualInterestPayment,
      annualPrincipalPayment: annualPrincipalPayment,
      remain: remain,
    }
  })

  return {
    annualPayment: annualPayment,
    rowAnnualData: rowAnnualData,
    inflation: arg.inflation,
  }
}

const addingInflation = (amount: number, inflation: number) => {
  return amount - (amount / 100) * inflation
}

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(1_000_000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)
  const [inflation, setInflation] = useState(10)

  const monthlyPayment = Math.round(calculateMonthlyPayment(amount, rate, years))

  const dataCalculateMortgage = calculateMortgage(amount, rate, years)

  const dataAnnualCalculateMortgage = calculateAnnualMortgage({ amount, rate, years, inflation })

  return (
    <ThemeProvider theme={themeMUI}>
      <Helmet>
        <title>Mortgage Calculator - Rudakevych Roman</title>
        <link rel='canonical' href='http://rudakevych.site/jshistory' />
      </Helmet>
      <CustomisedCard>
        <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
          Calculate your mortgage
        </Typography>
        <FormGroup>
          <Div_FormControlLabel>
            <CustomisedFormControlLabel
              control={
                <CustomisedInput
                  type='number'
                  placeholder='Loan Amount'
                  required
                  onChange={e => setAmount(Math.round(parseInt(e.target.value)))}
                  value={amount}
                  error={amount > maxAmount}
                />
              }
              label={'Insert amount'}
            />
            {amount > maxAmount && (
              <FormHelperText sx={{ display: 'flex', alignSelf: 'center' }}>
                Amount must be higher than 0 and less than {maxAmount}
              </FormHelperText>
            )}
          </Div_FormControlLabel>
          <Div_FormControlLabel>
            <CustomisedFormControlLabel
              control={
                <CustomisedInput
                  type='number'
                  placeholder='Interest Rate'
                  required
                  onChange={e => setRate(Math.round(parseInt(e.target.value)))}
                  value={rate}
                  error={rate > maxRate}
                />
              }
              label='Interest Rate'
            />
            {rate > maxRate && (
              <FormHelperText sx={{ display: 'flex', alignSelf: 'center' }}>
                Rate must be higher than 0 and less than {maxRate}%
              </FormHelperText>
            )}
          </Div_FormControlLabel>
          <Div_FormControlLabel>
            <CustomisedFormControlLabel
              control={
                <CustomisedInput
                  type='number'
                  placeholder='Loan Term'
                  required
                  onChange={e => setYears(Math.round(parseInt(e.target.value)))}
                  value={years}
                  error={years > maxYears}
                />
              }
              label='Loan Term'
            />
            {years > maxYears && (
              <FormHelperText sx={{ display: 'flex', alignSelf: 'center' }}>
                Years must be higher than 0 and less than {maxYears}
              </FormHelperText>
            )}
          </Div_FormControlLabel>
          <Div_FormControlLabel>
            <CustomisedFormControlLabel
              control={
                <CustomisedInput
                  type='number'
                  placeholder='Inflation'
                  required
                  onChange={e => setInflation(Math.round(parseInt(e.target.value)))}
                  value={inflation}
                  error={inflation > maxInflation}
                />
              }
              label='Inflation'
            />
            {years > maxYears && (
              <FormHelperText sx={{ display: 'flex', alignSelf: 'center' }}>
                Inflation must be higher than 0 and less than {maxInflation}
              </FormHelperText>
            )}
          </Div_FormControlLabel>
        </FormGroup>
        <Typography variant='h5' color='primary' sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          {Number.isFinite(monthlyPayment) &&
          amount < maxAmount &&
          rate < maxRate &&
          years < maxYears
            ? `Your monthly payment will be ${monthlyPayment} CZK`
            : 'Please fill all inputs correct'}
        </Typography>
        <ChartComponent calculatedAnnualMortgage={dataAnnualCalculateMortgage} />
        <CalculationTable calculatedMortgage={dataCalculateMortgage} />
      </CustomisedCard>
    </ThemeProvider>
  )
}

const ChartComponent = (props: {
  calculatedAnnualMortgage: ReturnType<typeof calculateAnnualMortgage>
}) => {
  const inflation = props.calculatedAnnualMortgage.inflation
  const annualData = props.calculatedAnnualMortgage.rowAnnualData

  const calculatedInflationRemainArr = annualData.map(v => addingInflation(v.remain, inflation))

  const calculatedInflationPrincipalPaymentArr = annualData.map(v =>
    addingInflation(v.annualPrincipalPayment, inflation)
  )

  const calculatedInflationinterestPaymentArr = annualData.map(v =>
    addingInflation(v.annualInterestPayment, inflation)
  )

  const remainSeries = {
    name: 'Remain',
    data: annualData.map(v => v.remain),
  }

  const remainSeriesWithInflation = {
    name: 'Remain with Inflation',
    data: calculatedInflationRemainArr,
  }

  const principalPaymentSeries = {
    name: 'Annual Principal Payment',
    data: annualData.map(v => v.annualPrincipalPayment),
  }

  const principalPaymentSeriesWithInflation = {
    name: 'Annual Principal Payment with Inflation',
    data: calculatedInflationPrincipalPaymentArr,
  }

  const interestPaymentSeries = {
    name: 'Annual Interest Payment',
    data: annualData.map(v => v.annualInterestPayment),
  }

  const interestPaymentSeriesWithInflation = {
    name: 'Annual Interest Payment With Inflation',
    data: calculatedInflationinterestPaymentArr,
  }
  const xAxisArray = Array.from({ length: annualData.length + 1 }, (v, i) => String(i + 1))

  const [chart, setChart] = useState({
    options: {
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#8F00FF'],
      chart: {
        id: 'basic-bar',
        foreColor: '#ffffff',
      },
      xaxis: {
        categories: xAxisArray,
      },
    },

    series: [
      remainSeries,
      principalPaymentSeries,
      remainSeriesWithInflation,
      principalPaymentSeriesWithInflation,
      interestPaymentSeries,
      interestPaymentSeriesWithInflation,
    ],
  })

  //https://apexcharts.com/docs/react-charts/
  const updateChart = () => {
    setChart({
      options: {
        ...chart.options,
        xaxis: {
          ...chart.options.xaxis,
          categories: xAxisArray,
        },
      },
      series: [
        remainSeries,
        principalPaymentSeries,
        remainSeriesWithInflation,
        principalPaymentSeriesWithInflation,
        interestPaymentSeries,
        interestPaymentSeriesWithInflation,
      ],
    })
  }

  return (
    <CustomisedCard>
      <Chart options={chart.options} series={chart.series} type='line' width='650' />
      <Button onClick={updateChart}>Update</Button>
    </CustomisedCard>
  )
}

const CalculationTable = (props: { calculatedMortgage: ReturnType<typeof calculateMortgage> }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <CustomTableCell>Month</CustomTableCell>
            <CustomTableCell align='center'>Payment Amount</CustomTableCell>
            <CustomTableCell align='center'>Interest Paid</CustomTableCell>
            <CustomTableCell align='center'>Principal Paid</CustomTableCell>
            <CustomTableCell align='center'>Remain</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.calculatedMortgage.rowData.map((el, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <CustomTableCell align='center'>{index + 1}</CustomTableCell>
              <CustomTableCell align='center'>
                {props.calculatedMortgage.monthlyPayment}
              </CustomTableCell>
              <CustomTableCell align='center'>{el.monthlyInterestPayment}</CustomTableCell>
              <CustomTableCell align='center'>{el.monthlyPrincipalPayment}</CustomTableCell>
              <CustomTableCell align='center'>{el.remain}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CustomTableCell = styled(TableCell)`
  color: ${theme.colors.white} !important;
`
const CustomisedInput = styled(Input)`
  input {
    color: ${theme.colors.white};
  }
`

const Div_FormControlLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
`

const CustomisedFormControlLabel = styled(FormControlLabel)`
  display: flex;
  color: ${theme.colors.white};
  flex-direction: column;
  input {
    text-align: center;
  }
`

export const CustomisedCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin 2rem auto;
  padding: 1rem 3rem 1rem 3rem;
  max-width: 850px;
  border: 1px solid white;
`
