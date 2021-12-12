import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewArticle.css";

const NewArticle = () => {
    const [picture, setPicture] = useState("");
    const [isPicture, setIsPicture] = useState(false);
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length > 140 || content === "") {
            setError(true);
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(sessionStorage.getItem("token")).token
                    }`,
                },
            };
            axios
                .post(
                    "http://localhost:8080/api/article/create",
                    {
                        picture: picture,
                        content: content,
                        publicationDate: new Date().toLocaleDateString(),
                    },
                    config
                )
                .then(() => {
                    document.querySelector("input[type=text]").value = "";
                    document.querySelector("textarea").value = "";
                    setPicture("");
                    setContent("");
                    setError(false);
                    navigate("/articles");
                });
        }
    };

    useEffect(async () => {
        await fetch(picture)
            .then((res) => {
                if (res.status === 404) setIsPicture(false);
                else setIsPicture(true);
            })
            .catch(() => setIsPicture(false));
    }, [picture]);

    return (
        <div className="newArticle">
            <h1>Add Article</h1>

            <form action="" onSubmit={handleSubmit}>
                {isPicture && (
                    <div className="img-container">
                        <img
                            src={picture}
                            alt=""
                            style={{
                                maxWidth: "350px",
                                maxHeight: "300px",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                )}

                <input
                    onInput={(e) => setPicture(e.target.value)}
                    type="text"
                    name="image"
                    id="image"
                    placeholder="lien de votre image"
                    autoComplete="off"
                />
                <textarea
                    style={{
                        border: error ? "1px solid red" : "1px solid #61dafb",
                    }}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setError(false);
                    }}
                    name="message"
                    id="message"
                    placeholder="Votre message"
                    cols="30"
                    rows="10"
                ></textarea>
                {error && <p>Veuillez ecrire moins de 140 caracteres</p>}
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default NewArticle;
