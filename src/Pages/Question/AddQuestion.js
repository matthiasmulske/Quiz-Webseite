import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useEffect, useState} from "react";

const domain = "http://localhost:5000";
const route = domain + "/categories";


// TODO: rename to data[correctAnswer]
// TODO: add selectedCategory to data
// TODO: handler "if undefined"

function AddQuestion() {
    let [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Betriebssysteme");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(domain + "/categories", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                return response.json();
            } catch (error) {
                console.error('Error fetching categories:', error);
                throw error; // Propagate the error to handle it outside this function
            }
        };

        fetchData()
            .then((categories) => setCategories(categories))
            .catch((error) => {
                alert("Server Down")
            });
    }, []);

    const handleDropdownChange = (event) => {
        const {target: { value }, } = event;
        setSelectedCategory(value)
    };

    function handleTextChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit() {
        try {
            const request = await fetch(domain + "/question", {
                method: "POST",
                body: JSON.stringify({
                    data
                }),
                headers: {"Content-Type": "application/json"},
            });

            if (!request.ok) {
                throw new Error('Failed to fetch categories');
            }

            return request.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error; // Propagate the error to handle it outside this function
        }
    }

    return (
        <>
            <h1 style={style.header}>Füge eine Frage hinzu</h1>
            <div style={style.componentContainer}>
                <FormAddQuestion
                    onTextChange={handleTextChange}
                    buttonLabel={"Frage einreichen"}
                    onClick={handleSubmit}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onDropDownChange={handleDropdownChange}
                />
            </div >
        </>
    )
}

export default AddQuestion;

const style = {
    header: {
        textAlign: 'center',
        paddingTop: 10,
    },

    componentContainer: {
        width: "100%",
    },




}
