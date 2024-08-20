import { useParams, useNavigate } from 'react-router-dom';
import { getTaskByIdApi, updateTaskByIdApi, createTaskApi } from './api/TaskHiveApiService';
import { useAuth } from './security/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function TaskComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();
    const [description, setDescription] = useState(null);
    const [targetDate, setTargetDate] = useState(null);


    const getTask = useCallback(() => {
        if (id !== -1) {
            getTaskByIdApi(authContext.username, id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch(error => console.log(error));
        }
    }, [authContext.username, id]);

    useEffect(
        () => { getTask() }, [getTask]
    )
    
    function onSubmitForm(values) {
        const task = {
            id: id,
            username: authContext.username,
            targetDate: values.targetDate,
            description: values.description,
            completed: false
        };

        if (id !== -1) {
            updateTaskByIdApi(authContext.username, id, task)
                .then(response => {
                    navigate('/tasks');
                })
                .catch(error => console.log(error));
        } else {
            createTaskApi(authContext.username, task)
                .then(response => {
                    navigate('/tasks');
                })
                .catch(error => console.log(error))
        }
    }

    function validateForm(values) {
        let errors = {};

        if (values.description.length < 10) {
            errors.description = "Description should be atleast 10 characters long";
        }

        function isFutureDate(date) {
            const today = new Date();
            const inputDate = new Date(date);

            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            return inputDate > today;
        }

        if (!isFutureDate(values.targetDate)) {
            errors.targetDate = "Target Date should be in future";
        }

        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Task's Details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmitForm}
                    validate={validateForm}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}