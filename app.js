const Joi = require('joi');
const express = require('express');
const app = express();




app.use(express.json());

const courses = [
    {id:1, name:"courrseOne"},
    {id:2, name:"courseTwo"},
    {id:3, name:"courseThree"}
]


function test () {
    console.log("test ....")
    return;
}

//get

app.get('/', (req, res) =>{
    res.send('hier is the HomePage')
});

app.get('/api/courses', (req, res) =>{
    res.send(courses)
});

app.get('/api/courses/:id', (req,res) =>{

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course not exist');
    res.send(course);
});


//post

app.post('/api/courses', (req,res) => {

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(newCourse);
    res.send(courses);
});


//put
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course not exist');

    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name
    res.send(courses);

});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}
//Delete

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course not exist');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}...`));








