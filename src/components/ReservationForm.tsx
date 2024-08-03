import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePickerCustom.css'
import { toast } from 'react-toastify'

const ReservationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        moveIn: null as Date | null,
        moveOut: null as Date | null,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDateChange = (
        date: Date | null,
        field: 'moveIn' | 'moveOut'
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const requestBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            startDate: formData.moveIn
                ? formData.moveIn.toISOString().split('T')[0]
                : '',
            endDate: formData.moveOut
                ? formData.moveOut.toISOString().split('T')[0]
                : '',
        }

        try {
            const response = await fetch(
                'https://skill-test.similater.website/api/v1/booking/add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            )

            if (response.ok) {
                toast.success('Reservation successfully made!')
                setFormData({
                    moveIn: null,
                    moveOut: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                })
            } else {
                const errorData = await response.json()
                toast.error(
                    `Failed to make a reservation: ${errorData.message || 'Unknown error'}`
                )
            }
        } catch (error) {
            console.error('Error submitting the reservation:', error)
            toast.error('An error occurred. Please try again.')
        }
    }

    return (
        <form
            className="bg- flex h-fit flex-col gap-6 rounded-lg bg-[#F8F8F8] px-6 py-8"
            onSubmit={handleSubmit}
        >
            <h3 className="text-lg font-medium capitalize sm:text-xl">
                Make a reservation
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <DatePicker
                    selected={formData.moveIn}
                    onChange={(date) => handleDateChange(date, 'moveIn')}
                    className="h-fit w-full rounded-md border border-primary-dark/25 px-3 py-2"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Move-in"
                    required
                />

                <DatePicker
                    selected={formData.moveOut}
                    onChange={(date) => handleDateChange(date, 'moveOut')}
                    className="h-fit w-full rounded-md border border-primary-dark/25 px-3 py-2"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Move-out"
                    required
                />

                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                    required
                />
            </div>

            <button type="submit" className="cta-btn custom-transition">
                Book Now
            </button>
        </form>
    )
}

export default ReservationForm
