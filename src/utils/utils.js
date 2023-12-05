import jwtDecode from "jwt-decode"
import { axiosReq } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult =>
                    accResult.id === cur.id) ? acc : [...acc, cur]
            }, prevResource.results)
        }))
    } catch (err) {
        console.log(err);
    }
}


export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
}

export const shouldRefreshToken = () => {
    const shouldRefresh = !!localStorage.getItem('refreshTokenTimestamp');
    return shouldRefresh;
}

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
}

export const checkCellValidity = (grid, index, value) => {
    const char = value.toString();
    if (char === '-') {
        return {
            isValid: true,
            clashingCell: -1,
            group: [],
        }
    }

    let valid = true;
    let clashingCellIndex = -1;
    let group = [];

    // Check row
    let start = Math.floor(index / 9) * 9;
    for (let i = start; i < start + 9; i++) {
        if (grid[i] === char && i !== index) {
            valid = false;
            clashingCellIndex = i;
            group = getRow(index);
            break;
        }
    }

    // Check column
    start = index % 9;
    for (let j = start; j <= 81; j += 9) {
        if (grid[j] === char && j !== index) {
            valid = false;
            clashingCellIndex = j;
            group = getColumn(index);
            break;
        }
    }

    // Check square
    let temp = Math.floor(index / 9);
    let indexMod9 = index % 9;
    let iStart = indexMod9 - (indexMod9 % 3);
    let jStart = temp - (temp % 3);
    for (let i = iStart; i < iStart + 3; i += 1) {
        for (let j = jStart; j < jStart + 3; j += 1) {
            let comparator = j * 9 + i;
            if (grid[comparator] === char && comparator !== index) {
                valid = false;
                group = getSquare(index);
                clashingCellIndex = comparator;
            }
        }
    }

    return {
        isValid: valid,
        clashingCell: clashingCellIndex,
        group: group,
    }
}

export const getRow = (index) => {
    let start = Math.floor(index / 9) * 9;
    let row = [];
    for (let i = start; i < start + 9; i++) {
        row.push(i);
    }
    return row;
}

export const getColumn = (index) => {
    let start = index % 9;
    let col = [];
    for (let j = start; j <= 81; j += 9) {
        col.push(j);
    }
    return col;
}

export const getSquare = (index) => {
    let temp = Math.floor(index / 9);
    let indexMod9 = index % 9;
    let iStart = indexMod9 - (indexMod9 % 3);
    let jStart = temp - (temp % 3);

    let square = [];
    for (let i = iStart; i < iStart + 3; i += 1) {
        for (let j = jStart; j < jStart + 3; j += 1) {
            square.push(j * 9 + i);
        }
    }
    return square;
}

export const replaceCharAt = (string, index, char) => {
    return string.substring(0, index)
        + char.toString()
        + string.substring(index + 1, string.length);
}

export const getExhaustedDigits = (grid) => {
    const array = new Array(10).fill(0);
    const exhaustedDigits = []
    for (let i = 0; i < 81; i++) {
        const char = grid.charAt(i);
        if (char !== '-') {
            const value = parseInt(grid.charAt(i));
            array[value]++;
        }
    }
    for (let i = 1; i <= 10; i++) {
        if (array[i] === 9) {
            exhaustedDigits.push(i);
        }
    }
    return exhaustedDigits;
}