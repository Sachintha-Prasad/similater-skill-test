const ReservationForm = () => {
    return (
        <form className="bg- flex h-fit flex-col gap-6 rounded-lg bg-[#F8F8F8] px-6 py-8">
            <h3 className="text-lg font-medium capitalize sm:text-xl">
                make a reservation
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <input
                    type="text"
                    name="move-in"
                    placeholder="Move-in"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
                <input
                    type="text"
                    name="move-out"
                    placeholder="Move-out"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
                <input
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
                <input
                    type="text"
                    name="last-name"
                    placeholder="Last Name"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile number"
                    className="h-fit rounded-md border border-primary-dark/25 px-3 py-2"
                />
            </div>

            <button type="submit" className="cta-btn custom-transision">
                {' '}
                book now
            </button>
        </form>
    )
}

export default ReservationForm
