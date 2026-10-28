
require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student'); 


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy and running!' });
});


app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/students/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid student ID format' });
        }
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input data' });
    }
});

app.put('/api/students/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid student ID format' });
        }
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input data' });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid student ID format' });
        }
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student record successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database connection successful!');
      
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
       
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });