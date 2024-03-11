import * as React from "react";
import FormAddQuestion from "../../components/FormAddQuestion";
import {useEffect, useState} from "react";

const domain = "http://localhost:5000";

// TODO: add selectedCategory to data
// TODO: handler "if undefined"
// TODO: handleDropDownChange should return the categoryID

function AddQuestion() {
    let [categories, setCategories] = useState(null);
    let [selectedCategory, setSelectedCategory] = useState(null);

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
            .then((categories) => {
                setCategories(categories);
                return categories;
            })
            .then((categories) => {
                setSelectedCategory(categories[0])
            })
            .catch((error) => {
                alert(error)
            });
    }, []);

    const handleDropdownChange = (event) => {
        const {target: { value }, } = event;
        setSelectedCategory(event.target)
    };

    function handleTextChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    function testCategory() {
        console.log(selectedCategory)
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
                throw new Error('Failed to post question');
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
                    onClick={testCategory}
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
