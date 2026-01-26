import React from 'react';
import { useEffect, useState } from 'react'
import './Projects.css'

const items = [
    {
        name: "Portfolio",
        category: ["Javascript/HTML/CSS", "React", "Git"]
    },
    {
        name: "Rogue-Like RPG Game",
        category: ["Unity", "C#", "Git"]
    },
    {
        name: "PosePerfect",
        category: ["Python", "Javascript/HTML/CSS", "Git"]
    },
    {
        name: "SigMaps",
        category: ["Gemini API", "Javascript/HTML/CSS", "Git"]
    },
    {
        name: "FlareRed",
        category: ["APIs", "Javascript/HTML/CSS", "Git"]
    }
];

function MultiFilters() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setfilteredItems] = useState(items);

    let filters = ["C#", "Javascript/HTML/CSS", "Python"];
    
    const handleFilterButtonClick = (selectedCategory) => {
        // unselect
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        }
        // add to selection
        else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters]);

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempItems = items.filter((item) => 
                selectedFilters.some((filter) => item.category.includes(filter))
            );
            setfilteredItems(tempItems);
        } else {
            setfilteredItems([...items]);
        }
    };

    return (
        <div>
            <div className='filters'>
                {filters.map((category, idx) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
                        className={`button ${
                            selectedFilters?.includes(category) ? "active" : ""
                        }`}
                        key={`filters-${idx}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className='items-category'>
                {filteredItems.map((item, idx) => (
                    <div key={`items-${idx}`} className="item">
                        <p>{item.name}</p>
                        <div className="tag-container">
                            {item.category.map((cat, i) => (
                                <span key={i} className='category-tag'>{cat}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}


const Projects = () => {
    return (
        <section className='projects' id="projects">
            <h1>Projects</h1>
            <MultiFilters />
        </section>
    );
};

export default Projects;