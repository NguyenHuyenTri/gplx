import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DayView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class Scheducer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Website Re-Design Plan',
          startDate: new Date(2018, 5, 25, 9, 35),
          endDate: new Date(2018, 5, 25, 11, 30),
          id: 0,
          location: 'Room 1',
        },
        {
          title: 'Book Flights to San Fran for Sales Trip',
          startDate: new Date(2018, 5, 25, 12, 11),
          endDate: new Date(2018, 5, 25, 13, 0),
          id: 1,
          location: 'Room 1',
        },
      ],
      currentDate: '2018-06-27',
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data } = this.state;
    return (
      <Paper>
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={19} />
          {/* <Toolbar /> */}
          {/* <DateNavigator /> */}
          {/* <TodayButton /> */}
          <Appointments />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
