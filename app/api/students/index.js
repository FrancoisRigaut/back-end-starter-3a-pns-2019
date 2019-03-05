const { Router } = require('express');
const { Student } = require('../../models');
const NotFoundError = require('../../utils/errors/not-found-error');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.post('/', (req, res) => {
  try {
    const ticket = Student.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

function searchStudent(search) {
  let s;
  if (typeof search === 'string') s = parseInt(search, 10);
  if (!s) s = search;
  const studentsList = Student.get();
  const result = [];
  studentsList.forEach((elem) => {
    if (elem.id === s || elem.name === s || elem.firstName === s) {
      result.push(elem);
    }
  });
  if (result.length === 0) throw new NotFoundError(`Cannot get ${this.name} search=${s} : not found`);
  return result;
}

router.get('/:search', (req, res) => res.status(200).json(searchStudent(req.params.search)));
router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));
router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));

module.exports = router;
