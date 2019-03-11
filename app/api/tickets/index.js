const { Router } = require('express');
const { Ticket } = require('../../models');
const { Student } = require('../../models');

const router = new Router();

function attachStudent(ticket) {
  ticket.students = [];
  for (let i = 0; i < ticket.studentIds.length; i += 1) {
    ticket.students.push(Student.getById(ticket.studentIds[i]));
  }
  return ticket;
}

router.put('/:ticketId', (req, res) => {
  try {
    res.status(200).json(Ticket.update(req.params.ticketId, req.body));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/:ticketId', (req, res) => {
  res.status(200).json(attachStudent(Ticket.getById(req.params.ticketId)));
});

router.delete('/:ticketId', (req, res) => {
  Ticket.delete(req.params.ticketId);
  res.status(200).json('ok');
});

router.get('/', (req, res) => {
  const tickets = Ticket.get();
  for (let i = 0; i < tickets.length; i += 1) {
    attachStudent(tickets[i]);
  }
  res.status(200).json(tickets);
});

router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    res.status(201).json(attachStudent(ticket));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
