import React, { useEffect, useState } from 'react'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom'
import SelectField from '../../common/form/selectField'
import TextField from '../../common/form/textField'
import { validator } from '../../../utils/validator'
import BackHistoryButton from '../../common/backButton'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const EditPage = () => {
    const params = useParams()
    const { userId } = params
    const { currentUser } = useAuth()
    const { updateUser } = useAuth()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const { qualities } = useQualities()
    const filterQuality = qualities.filter(q =>
        currentUser.qualities.includes(q._id)
    )
    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id
    }))
    const { professions } = useProfessions()
    const professionsList = professions.map(p => ({
        label: p.name,
        value: p._id
    }))

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен не корректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
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
        setIsLoading(true)
        setData(prevState => ({
            ...prevState,
            ...data,
            ...currentUser,
            profession: currentUser.profession,
            qualities: filterQuality.map(q => ({
                label: q.name,
                value: q._id
            }))
        }))
    }, [qualities])

    useEffect(() => {
        if (data._id) setIsLoading(false)
    }, [data])

    const handleChange = target => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = { ...data, qualities: data.qualities.map(q => q.value) }
        try {
            await updateUser(newData)
            history.push(`/users/${userId}`)
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
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
                                options={professionsList}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
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
                                options={qualitiesList}
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
                        </form>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditPage
