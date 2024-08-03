type ImagesList = {
    name: string
    path: string
}

const imagesList: ImagesList[] = [
    { name: 'image 1', path: '/images/img-1.png' },
    { name: 'image 2', path: '/images/img-2-1.png' },
    { name: 'image 3', path: '/images/img-2-2.png' },
    { name: 'image 4', path: '/images/img-3-1.png' },
    { name: 'image 5', path: '/images/img-3-2.png' },
    { name: 'image 6', path: '/images/img-4-1.png' },
    { name: 'image 7', path: '/images/img-4-2.png' },
]

const ImageGallery = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:grid-rows-3 sm:gap-4">
            {imagesList.map((img, index) => (
                <img
                    key={index}
                    src={img.path}
                    alt={img.name}
                    className={`${img.path === imagesList[0].path && 'col-span-full sm:col-span-2 sm:row-span-full'} h-full w-full rounded-lg object-cover object-center`}
                />
            ))}
        </div>
    )
}

export default ImageGallery
