import React from 'react'
import { RiHome2Line } from 'react-icons/ri'
import { LiaBathSolid } from 'react-icons/lia'
import { LuUser } from 'react-icons/lu'
import { GoKey } from 'react-icons/go'

export const description = {
    name: 'Lorem ipsum dolor',
    location: '123 Dolorum architecto, B1 1GB',
    amenties: [
        {
            name: 'bedrooms',
            count: 2,
            icon: React.createElement(RiHome2Line),
        },
        {
            name: 'bathrooms',
            count: 2,
            icon: React.createElement(LiaBathSolid),
        },
        {
            name: 'guest',
            count: 5,
            icon: React.createElement(LuUser),
        },
    ],
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at rutrum sapien, a volutpat massa. Maecenas congue luctus dui quis rhoncus. Praesent feugiat nulla quis libero tristique tempor. Vivamus efficitur rhoncus neque id lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus.',

    features: {
        titel: 'Designed for Quality',
        icon: React.createElement(GoKey),
        list: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'In quis urna pretium, pretium mi sit amet, pellentesque enim.',
            'Sed sagittis nulla non congue lacinia.',
            'In quis urna pretium, pretium mi sit amet, pellentesque enim.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        ],
    },
} as const
