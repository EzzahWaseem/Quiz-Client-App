import React, { useState, useEffect } from 'react';
import Question from './questions/question';
import Answer from './answers/answer';
import './quiz.css';
import { useDispatch, useSelector } from 'react-redux';
import { getList, postScore } from '../../actions/posts';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export default function Quiz() {
    const dispatch = useDispatch();
    let questionList;
    questionList = useSelector((state) => state.posts);
    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);
    const userScoreData = useSelector((state) => state.user);
    const [scoreValue, setScore] = useState({
        name: "",
        score: "",
    })
    const obj = {
        questions: {},
        answers: {},
        correctAnswers: {},
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        scoreUser: 0
    }
    useEffect(() => {
        setTimeout(() => {
            questionList?.forEach((x, index) => {

                obj.questions[index + 1] = x.questions;
                let opt = { 1: x.optiona, 2: x.optionb, 3: x.optionc };
                obj.answers[index + 1] = opt;
                obj.correctAnswers[index + 1] = Object.values(opt).indexOf(x.answer) + 1
            })
            setData(obj)
        }, 0)
    }, [questionList])
    const [data, setData] = useState(obj);
    var checkAnswer = answer => {
        var { correctAnswers, step, scoreUser } = data;
        if (parseInt(answer) === correctAnswers[step]) {
            setData({
                ...data,
                scoreUser: scoreUser + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });

        } else {
            setData({
                ...data,
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    var nextStep = (step) => {
        setData({
            ...data,
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
        setScore({
            ...scoreValue,
            name: userScoreData[0].firstName + " " + userScoreData[0].lastName,
            score: scoreUser
        })

    }
    const endQuiz = () => {
        dispatch(postScore(scoreValue));
        alert("Thanks for attempting the Quiz")
    }

    var { questions, answers, correctAnswer, clickedAnswer, step, scoreUser } = data;
    return (
        <div className="Content">
            {(step) <= Object.keys(questions).length ?
                (<>
                    <Question
                        question={questions[step]}
                    />
                    <Answer
                        answer={answers[step]}
                        step={step}
                        checkAnswer={checkAnswer}
                        correctAnswer={correctAnswer}
                        clickedAnswer={clickedAnswer}
                    />
                    <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(questions).length >= step
                                ? false : true
                        }
                        onClick={() => nextStep(step)}>Next</button>
                </>) : (Object.keys(questions).length) ? (
                    <div className="finalPage" >
                        <h1>You have completed the quiz!</h1>
                        <p>Your score is: {scoreUser} of {Object.keys(questions).length}</p>
                        <p>Thank you!</p>
                        <Button variant="contained" color="primary" onClick={endQuiz}>Click Here to End</Button>
                    </div>
                ) : <Typography variant="h4">Loading...</Typography>
            }
        </div>
    );

}