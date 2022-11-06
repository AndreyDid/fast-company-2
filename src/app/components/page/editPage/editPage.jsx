import React, { useEffect, useState } from 'react'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import api from '../../../api'
import { useHistory, useParams } from 'react-router-dom'
import SelectField from '../../common/form/selectField'
import TextField from '../../common/form/textField'
import { update } from '../../../api/fake.api/user.api'
import { validator } from '../../../utils/validator'

const EditPage = () => {
    const params = useParams()
    const { userId } = params
    const history = useHistory()
    const [data, setData] = useState([])
    const [qualities, setQualities] = useState([])
    const [professions, setProfession] = useState([])
    const [errors, setErrors] = useState({})

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен не корректно'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    useEffect(() => {
        api.users.getById(userId).then(data =>
            setData(prevState => ({
                ...prevState,
                ...data,
                profession: data.profession._id,
                qualities: Object.keys(data.qualities).map(qualitiesName => ({
                    label: data.qualities[qualitiesName].name,
                    value: data.qualities[qualitiesName]._id,
                    color: data.qualities[qualitiesName].color
                }))
            }))
        )
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then(data => {
            const professionsList = Object.keys(data).map(professionName => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfession(professionsList)
        })
        api.qualities.fetchAll().then(data => {
            const qualitiesList = Object.keys(data).map(optionName => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])

    const handleChange = target => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }))
    }

    const getProfessionById = id => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }
    const getQualities = elements => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const jumpUserPage = () => {
        history.push(`/users/${userId}`)
    }
    const handleSubmit = e => {
        jumpUserPage()
        e.preventDefault()
        const { profession, qualities } = data
        console.log('Submit', {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
        update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            name="profession"
                            options={professions}
                            onChange={handleChange}
                            value={data.profession}
                        />
                        <RadioField
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />

                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Обновить
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditPage
