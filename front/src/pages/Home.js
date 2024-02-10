import React from "react";
import {Typography} from "@material-tailwind/react";

export default function Home() {
    return (
        <div className="text-center">
            <Typography className="-mb-1" color="blue-gray" variant="h2">
                HOME
            </Typography>
            <p>This is the home page</p>
        </div>
    )
}