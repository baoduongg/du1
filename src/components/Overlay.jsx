import React from 'react'
import { motion } from 'framer-motion'

export default function Overlay() {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-y-auto flex items-center justify-center">
            <span className="text-2xl font-bold text-white tracking-tighter">Chào mừng bạn đến với trang web của chúng tôi!</span>
        </div>
    )
}
