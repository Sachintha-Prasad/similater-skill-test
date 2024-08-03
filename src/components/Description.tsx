import { description } from '../lib/data'

const Description = () => {
    return (
        <div className="flex flex-col gap-6 sm:gap-12">
            <div className="flex flex-col gap-3">
                <p className="capitalize">
                    apartments in{' '}
                    <span className="underline">{description.location}</span>
                </p>
                <h1 className="text-2xl font-semibold sm:text-3xl lg:text-5xl">
                    {description.name}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {description.amenties.map((ament, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center gap-1"
                        >
                            <div className="text-lg">{ament.icon}</div>
                            <p className="flex gap-1 capitalize">
                                <span>{ament.count}</span> {ament.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <p>{description.desc}</p>

            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium capitalize sm:text-xl">
                    {description.features.titel}
                </h2>
                <div className="flex flex-col gap-2">
                    {description.features.list.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div>{description.features.icon}</div>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Description
