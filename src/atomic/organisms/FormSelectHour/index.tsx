import React, { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { useForm, Controller } from 'react-hook-form'

import { Text } from '../../atoms/Text'
import { Card } from '../../atoms/Card'
import { Button } from '../../atoms/Button'
import { ListItem } from '../../molecules/ListItem'

import {
  HourTitleWrapper,
  IconHour,
  ListItemRadio,
  ClosedUnitsAndResultsWrapper,
  ButtonsWrapper
} from './styles'

export interface IFormSelectHourInputs {
  hour?: [Date, Date]
  showClosed: boolean
}

export interface IFormSelectHour {
  onSubmit: (form: IFormSelectHourInputs) => void
  quantity: number
}

const defaultValues: IFormSelectHourInputs = {
  hour: undefined,
  showClosed: false
}

const hours = {
  morning: (() => {
    const start = new Date(0)
    const end = new Date(0)
    start.setHours(6)
    end.setHours(12)
    return [start, end]
  })(),
  afternoon: (() => {
    const start = new Date(0)
    const end = new Date(0)
    start.setHours(12)
    end.setHours(18)
    return [start, end]
  })(),
  night: (() => {
    const start = new Date(0)
    const end = new Date(0)
    start.setHours(18)
    end.setHours(23)
    return [start, end]
  })()
}

export const FormSelectHour: React.FC<IFormSelectHour> = ({
  onSubmit = () => {},
  quantity = 0,
  ...props
}) => {
  const theme = useTheme()
  const { control, handleSubmit, reset } = useForm<IFormSelectHourInputs>({
    defaultValues
  })

  const onSubmitPress = handleSubmit(onSubmit)

  return (
    <Card color={theme.colors.white} border={4} radius={8} padding={16}>
      <HourTitleWrapper>
        <IconHour />
        <Text>Horário</Text>
      </HourTitleWrapper>
      <ListItem text='Qual período quer treinar?' marginBottom={16} />
      <Controller
        name='hour'
        control={control}
        render={({ field }) => (
          <>
            <ListItemRadio
              text='Manhã'
              rightText='06:00 às 12:00'
              onClick={() => field.onChange(hours.morning)}
              active={
                field?.value?.[0].getHours() === hours.morning[0].getHours()
              }
            />
            <ListItemRadio
              text='Tarde'
              rightText='12:01 às 18:00'
              onClick={() => field.onChange(hours.afternoon)}
              active={
                field?.value?.[0].getHours() === hours.afternoon[0].getHours()
              }
            />
            <ListItemRadio
              text='Noite'
              rightText='18:01 às 23:00'
              onClick={() => field.onChange(hours.night)}
              active={
                field?.value?.[0].getHours() === hours.night[0].getHours()
              }
              marginBottom={16}
            />
          </>
        )}
      />

      <ClosedUnitsAndResultsWrapper>
        <Controller
          name='showClosed'
          control={control}
          render={({ field }) => (
            <ListItem
              text='Exibir unidades fechadas'
              withCheckbox
              checkboxProps={{ size: 20 }}
              withBottomLine={false}
              active={field.value}
              onClick={() => field.onChange(!field.value)}
            />
          )}
        />
        <Text align='center'>
          Resultados encontrados:{' '}
          <Text weight='bold' size={20} newLine={false}>
            {quantity}
          </Text>
        </Text>
      </ClosedUnitsAndResultsWrapper>
      <ButtonsWrapper>
        <Button text='Encontrar unidade' onClick={onSubmitPress} uppercase />
        <Button
          text='Limpar'
          onClick={() => reset(defaultValues)}
          variation='outlined'
          uppercase
        />
      </ButtonsWrapper>
    </Card>
  )
}
