export const backgroundEvents = [
  {
    id: "bg-2025-03-04",
    start: "2025-03-04",
    end: "2025-03-05",
    display: "background",
    classNames: ["bg-event-green"],
  },
  {
    id: "bg-2025-03-05",
    start: "2025-03-05",
    end: "2025-03-06",
    display: "background",
    classNames: ["bg-event-red"],
  },
  {
    id: "bg-2025-03-06",
    start: "2025-03-06",
    end: "2025-03-07",
    display: "background",
    classNames: ["bg-event-yellow"],
  },
  {
    id: "bg-2025-03-07",
    start: "2025-03-07",
    end: "2025-03-08",
    display: "background",
    classNames: ["bg-event-red"],
  },
  {
    id: "bg-2025-03-10",
    start: "2025-03-10",
    end: "2025-03-11",
  },
  {
    id: "bg-2025-03-11",
    start: "2025-03-11",
    end: "2025-03-12",
  },
  {
    id: "bg-2025-03-12",
    start: "2025-03-12",
    end: "2025-03-13",
  },
  {
    id: "bg-2025-03-13",
    start: "2025-03-13",
    end: "2025-03-14",
  },
];

export const availableTimeslots = [
  {
    id: 4,
    title: "available timeslot",
    start: "2025-03-07T08:00:00",
    end: "2025-03-07T09:00:00",
  },
  {
    id: 5,
    title: "available timeslot",
    start: "2025-03-010T09:00:00",
    end: "2025-03-10T10:00:00",
  },
  {
    id: 6,
    title: "available timeslot",
    start: "2025-03-10T13:00:00",
    end: "2025-03-10T14:00:00",
  },
  {
    id: 7,
    title: "available timeslot",
    start: "2025-03-10T14:00:00",
    end: "2025-03-10T15:00:00",
  },
  {
    id: 8,
    title: "available timeslot",
    start: "2025-03-11T15:00:00",
    end: "2025-03-11T16:00:00",
  },
  {
    id: 9,
    title: "available timeslot",
    start: "2025-03-06T16:00:00",
    end: "2025-03-06T17:00:00",
  },
  {
    id: 10,
    title: "available timeslot",
    start: "2025-03-12T08:00:00",
    end: "2025-03-12T09:00:00",
  },
  {
    id: 11,
    title: "available timeslot",
    start: "2025-03-13T13:00:00",
    end: "2025-03-13T14:00:00",
  },
];

export const scheduledAppointments = [
  {
    id: 1,
    title: "BREAK",
    start: "2025-03-04T10:00:00",
    end: "2025-03-04T11:00:00",
    description: "break",
    classNames: ["break-event"],
  },
  {
    id: 2,
    title: "Hot Water Heater Replacement",
    start: "2025-03-04T11:00:00",
    end: "2025-03-04T12:00:00",
    extendedProps: {
      department: "Plumbing",
      serviceType: "Hot Water Heater Replacement",
      technician: "John Lane",
      customerName: "Fred Flintstone",
    },
  },
  {
    id: 3,
    title: "Faucet Repair - Smith",
    start: "2025-03-04T12:00:00",
    end: "2025-03-04T13:00:00",
    extendedProps: {
      department: "Plumbing",
      serviceType: "Faucet Repair",
      technician: "John Lane",
      customerName: "Susie Smith",
    },
  },
  {
    id: 4,
    title: "Dishwasher Replacement",
    start: "2025-03-04T13:00:00",
    end: "2025-03-04T14:00:00",
    extendedProps: {
      department: "Plumbing",
      serviceType: "Dishwasher Replacement",
      technician: "John Lane",
      customerName: "Veronica Arenz",
    },
  },
];

export const allEvents = [
  {
    id: 4,
    title: "available timeslot",
    start: "2025-03-04T08:00:00",
    end: "2025-03-04T09:00:00",
    // extendedProps: {
    //   department: 'Plumbing',
    // },
    // description: 'open timeslot',
  },
  {
    id: 5,
    title: "available timeslot",
    start: "2025-03-04T09:00:00",
    end: "2025-03-04T10:00:00",
  },
  {
    id: 1,
    title: "break time",
    start: "2025-03-04T10:00:00",
    end: "2025-03-04T11:00:00",
    extendedProps: {
      department: "Plumbing",
    },
    description: "break",
  },
  {
    id: 2,
    title: "Hot Water Heater Replacement - Flintstone",
    start: "2025-03-04T11:00:00",
    end: "2025-03-04T12:00:00",
    extendedProps: {
      department: "Plumbing",
      serviceType: "Hot Water Heater Replacement",
      technician: "John Lane",
      customerName: "Fred Flintstone",
    },
  },
  {
    id: 3,
    title: "dishwasher replacement",
    start: "2025-03-04T12:00:00",
    end: "2025-03-04T13:00:00",
    extendedProps: {
      department: "Plumbing",
    },
    description: "service appointment",
  },
  {
    id: 6,
    title: "available timeslot",
    start: "2025-03-04T13:00:00",
    end: "2025-03-04T14:00:00",
  },
  {
    id: 7,
    title: "available timeslot",
    start: "2025-03-04T14:00:00",
    end: "2025-03-04T15:00:00",
  },
  {
    id: 8,
    title: "available timeslot",
    start: "2025-03-04T15:00:00",
    end: "2025-03-04T16:00:00",
  },
  {
    id: 9,
    title: "available timeslot",
    start: "2025-03-04T16:00:00",
    end: "2025-03-04T17:00:00",
  },
];
