import React, { useState, useEffect, useRef } from 'react';
import { getRandomNumbers } from '../utils/getRandomNumbers'

export default function RandomNumbers() {
    return (
        <>
            <h1>Random Numbers</h1>
            <ul>
                {
                    getRandomNumbers(5).map((e, i) => (
                        <li key={i}>{e}</li>
                    ))
                }
            </ul>
        </>
    );
}
