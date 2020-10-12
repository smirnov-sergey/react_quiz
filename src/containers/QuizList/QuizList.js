import React from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from '../../store/actions/quiz';

class QuizList extends React.Component {
    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
        // axios.get('https://react-1a0f0.firebaseio.com/quiz.json/').then(response => {
        //     console.log(response)
        // })
    }

    render() {
        return (
            <div className="QuizList">
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)