import { useEffect, useState } from 'react'


import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projetoData}){

    const [categories, setCategories] = useState([])
    const [projeto, setProjeto] = useState(projetoData || {})

    useEffect(() =>{
    fetch("http://localhost:5000/categories", {
    method:"Get",
    headers: {
        'Content-Type': 'application/json',
     },
    })
    .then((resp) => resp.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(projeto)
        handleSubmit(projeto)
        
    }

    function handleChange(e) {
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        setProjeto({...projeto, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
        })
    }


    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Nome do projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={projeto.name ? projeto.name: ''}
            />
            <Input 
            type="number" 
            text="Orçamento do projeto" 
            name="budget" 
            placeholder="Insira o valor do orçamento" 
            handleOnChange={handleChange}
            value={projeto.budget ? projeto.budget: ''}
            />
            <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories} 
            handleOnChange={handleCategory} 
            value={projeto.category ? projeto.category.id : ''}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm