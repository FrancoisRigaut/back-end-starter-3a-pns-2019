const { Router } = require('express');
const { Student } = require('../../models');
const { Ticket } = require('../../models');

const router = new Router();

function getByNameAndFirstName(name, firstname) {
  const items = Student.get();
  const toReturn = [];
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].name.toLowerCase().includes(name.toLowerCase())
      && items[i].firstname.toLowerCase().includes(firstname.toLowerCase())) {
      toReturn.push(items[i]);
    }
  }
  return toReturn;
}

function getByName(name) {
  const items = Student.get();
  const toReturn = [];
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].name.toLowerCase().includes(name.toLowerCase())) {
      toReturn.push(items[i]);
    }
  }
  return toReturn;
}

function getByFirstname(firstname) {
  const items = Student.get();
  const toReturn = [];
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].firstname.toLowerCase().includes(firstname.toLowerCase())) {
      toReturn.push(items[i]);
    }
  }
  return toReturn;
}

function getTicketsOfStudent(studentId) {
  studentId = parseInt(studentId, 10);
  const tickets = Ticket.get();
  const toReturn = [];
  for (let i = 0; i < tickets.length; i += 1) {
    if (tickets[i].studentIds.contains(studentId)) toReturn.push(tickets[i]);
  }
  return toReturn;
}

function deleteTicketsFromStudent(studentId) {
  for (let i = 0; i < Ticket.get().length; i += 1) {
    const studentsIds = [];
    for (let j = 0; j < Ticket.get()[i].studentIds.length; j += 1) {
      if (Ticket.get()[i].studentIds[j] !== parseInt(studentId, 10)) {
        studentsIds.push(Ticket.get()[i].studentIds[j]);
      }
    }
    Ticket.get()[i].studentIds = studentsIds;
  }
}

router.post('/', (req, res) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:studentId', (req, res) => {
  deleteTicketsFromStudent(req.params.studentId);
  Student.delete(req.params.studentId);
  res.status(200).json('ok');
});

router.put('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.update(req.params.studentId, req.body));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/:studentId', (req, res) => {
  res.status(200).json(Student.getById(req.params.studentId));
});

router.get('/name/:studentName', (req, res) => {
  res.status(200).json(getByName(req.params.studentName));
});

router.get('/firstname/:studentfirstName', (req, res) => {
  res.status(200).json(getByFirstname(req.params.studentfirstName));
});

router.get('/name/:studentName/firstname/:studentfirstName', (req, res) => {
  res.status(200).json(getByNameAndFirstName(req.params.studentName, req.params.studentfirstName));
});

router.get('/tickets/:studentId', (req, res) => {
  res.status(200).json(getTicketsOfStudent(req.params.studentId));
});

router.get('/', (req, res) => {
  res.status(200).json(Student.get());
});

module.exports = router;
