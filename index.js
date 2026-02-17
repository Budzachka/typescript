"use strict";
console.log(`Use: triangle(value1, type1, value2, type2)
types: "leg" | "hypotenuse" | "adjacent angle" | "opposite angle" | "angle"
examples:
triangle(2, "leg", 4, "leg")
triangle(3, "leg", 10, "hypotenuse")`);
function triangle(value1, type1, value2, type2) {
    const validTypes = [
        "leg",
        "hypotenuse",
        "adjacent angle",
        "opposite angle",
        "angle",
    ];
    if (!Number.isFinite(value1) || !Number.isFinite(value2)) {
        console.log("Values must be finite numbers.");
        return "failed";
    }
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("You inputed incorrect types.");
        return "failed";
    }
    if (type1 === "hypotenuse" && type2 === "hypotenuse") {
        console.log("You inputed two hypotenuses.");
        return "failed";
    }
    if (type1 === "angle" && type2 === "angle") {
        console.log("You inputed two angles.");
        return "failed";
    }
    if ((type1 === "angle" && type2 !== "hypotenuse") ||
        (type2 === "angle" && type1 !== "hypotenuse")) {
        console.log("You inputed  angle with other type (not hypotenuse).");
        return "failed";
    }
    if ((type1 === "hypotenuse" && type2 === "leg" && value1 - value2 <= 0) ||
        (type1 === "leg" && type2 === "hypotenuse" && value2 - value1 <= 0)) {
        return "Hypotenuse must be greater than the leg";
    }
    if (((type1 === "angle" && value1 >= 90) || (type2 === "angle" && value2 >= 90)) ||
        ((type1 === "opposite angle" && value1 >= 90) ||
            (type2 === "opposite angle" && value2 >= 90)) ||
        ((type1 === "adjacent angle" && value1 >= 90) ||
            (type2 === "adjacent angle" && value2 >= 90))) {
        return "The angles of the triangle must be acute";
    }
    if (value1 <= 0 || value2 <= 0) {
        console.log("Zero or negative values.");
        return "failed";
    }
    let a;
    let b;
    let c;
    let alpha;
    let beta;
    const toDegrees = (rad) => rad * (180 / Math.PI);
    const toRadians = (deg) => deg * (Math.PI / 180);
    switch (type1) {
        case "leg":
            a = value1;
            switch (type2) {
                case "leg":
                    b = value2;
                    c = Math.sqrt(a ** 2 + b ** 2);
                    alpha = toDegrees(Math.asin(a / c));
                    beta = 90 - alpha;
                    break;
                case "hypotenuse":
                    c = value2;
                    b = Math.sqrt(c ** 2 - a ** 2);
                    alpha = toDegrees(Math.asin(a / c));
                    beta = 90 - alpha;
                    break;
                case "adjacent angle":
                    beta = value2;
                    c = a / Math.cos(toRadians(beta));
                    b = Math.sqrt(c ** 2 - a ** 2);
                    alpha = 90 - beta;
                    break;
                case "opposite angle":
                    alpha = value2;
                    c = a / Math.sin(toRadians(alpha));
                    b = Math.sqrt(c ** 2 - a ** 2);
                    beta = 90 - alpha;
                    break;
                default:
                    console.log("Insufficient data entered");
                    return "failed";
            }
            break;
        case "hypotenuse":
            c = value1;
            if (type2 === "angle") {
                alpha = value2;
                a = c * Math.sin(toRadians(alpha));
                b = Math.sqrt(c ** 2 - a ** 2);
                beta = 90 - alpha;
            }
            else if (type2 === "leg") {
                a = value2;
                b = Math.sqrt(c ** 2 - a ** 2);
                alpha = toDegrees(Math.asin(a / c));
                beta = 90 - alpha;
            }
            else {
                console.log("Insufficient data entered");
                return "failed";
            }
            break;
        case "adjacent angle":
            if (type2 === "leg") {
                alpha = value1;
                a = value2;
                c = a / Math.cos(toRadians(alpha));
                b = Math.sqrt(c * c - a * a);
                beta = 90 - alpha;
            }
            else if (type2 === "hypotenuse") {
                alpha = value1;
                c = value2;
                a = c * Math.sin(toRadians(alpha));
                b = Math.sqrt(c ** 2 - a ** 2);
                alpha = toDegrees(Math.asin(a / c));
                beta = 90 - alpha;
            }
            else {
                console.log("Insufficient data entered");
                return "failed";
            }
            break;
        case "opposite angle":
            if (type2 === "leg") {
                alpha = value1;
                a = value2;
                c = a / Math.sin(toRadians(alpha));
                b = Math.sqrt(c ** 2 - a ** 2);
                beta = 90 - alpha;
            }
            else if (type2 === "hypotenuse") {
                alpha = value1;
                c = value2;
                a = c * Math.cos(toRadians(alpha));
                b = Math.sqrt(c ** 2 - a ** 2);
                beta = 90 - alpha;
            }
            else {
                console.log("Insufficient data entered");
                return "failed";
            }
            break;
        case "angle":
            alpha = value1;
            c = value2;
            a = c * Math.sin(toRadians(alpha));
            b = Math.sqrt(c ** 2 - a ** 2);
            beta = 90 - alpha;
            break;
        default:
            console.log("Insufficient data entered");
            return "failed";
    }
    if (a === undefined ||
        b === undefined ||
        c === undefined ||
        alpha === undefined ||
        beta === undefined ||
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c) ||
        !Number.isFinite(alpha) ||
        !Number.isFinite(beta)) {
        console.log("Calculations produced invalid results.");
        return "failed";
    }
    if (!(a + b > c && a + c > b && c + b > a)) {
        return "The sum of two sides less any side of the triangle .Calculations are impossible";
    }
    if (alpha >= 90 || alpha === 0 || beta >= 90 || beta === 0) {
        return "The angles of the triangle must be acute";
    }
    console.log("a = " + a);
    console.log("b = " + b);
    console.log("c = " + c);
    console.log("alpha = " + alpha);
    console.log("beta = " + beta);
    return "success";
}
globalThis.triangle = triangle;
