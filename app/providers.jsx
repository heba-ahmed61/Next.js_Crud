'use client'

import { SessionProvider, useSession } from "next-auth/react"
import React from "react"

export default function Providers({children}){

    return(
        <SessionProvider>{children}</SessionProvider>
    )
}