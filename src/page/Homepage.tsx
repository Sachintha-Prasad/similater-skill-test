import ImageGallery from '../components/ImageGallery'
import Description from '../components/Description'
import ReservationForm from '../components/ReservationForm'

const Homepage = () => {
    return (
        <div className="container grid gap-x-6 gap-y-6 sm:mt-8 sm:grid-cols-2 sm:gap-y-12">
            <div className="sm:col-span-2">
                <ImageGallery />
            </div>
            <Description />
            <ReservationForm />
        </div>
    )
}

export default Homepage
