const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/quizQuestion');

// CREATE: Criar nova pergunta
router.post('/quiz', async (req, res) => {
  try {
    const { question, option_a, option_b, option_c, option_d, option_e, correct_option } = req.body;
    const newQuestion = await QuizQuestion.create({
      question,
      option_a,
      option_b,
      option_c,
      option_d, 
      option_e,
      correct_option
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar pergunta.' });
  }
});

// READ: Obter todas as perguntas
router.get('/quiz', async (req, res) => {
  try {
    const questions = await QuizQuestion.findAll();
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter perguntas.' });
  }
});

// UPDATE: Atualizar pergunta existente
router.put('/quiz/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { question, option_a, option_b, option_c, option_d, option_e, correct_option } = req.body;
    const updatedQuestion = await QuizQuestion.update({
      question,
      option_a,
      option_b,
      option_c,
      option_d, 
      option_e,
      correct_option
    }, {
      where: { id },
      returning: true
    });
    res.status(200).json(updatedQuestion[1][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar pergunta.' });
  }
});

// DELETE: Excluir pergunta existente
router.delete('/quiz/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await QuizQuestion.destroy({ where: { id } });
    res.status(200).json({ message: 'Pergunta excluída com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao excluir pergunta.' });
  }
});

module.exports = router;
