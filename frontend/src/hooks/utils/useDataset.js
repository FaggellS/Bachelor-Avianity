// imports

import { useState } from "react"
import { useAuthContext } from "../contexthooks/useAuthContext"

import  Papa  from 'papaparse'
import JSZip from 'jszip'



export const useDataset = () => {
    const { user } = useAuthContext()

    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const generateDataset = async ( selection, format ) => {
        setLoading(true)
        setError(null)

        console.log("format: ", format)

        const zip = new JSZip()

        for ( let photo of selection) {
            const image = await fetch("/api/" + photo.imagepath)
            const blob = await image.blob()
            zip.file(photo.imagepath.split("/").pop(), blob)
               
        }

        const zipData = await zip.generateAsync({
            type: "blob",
            streamFiles: true,
        })

        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(zipData)
        link.download = "birdDataset-images.zip"


        
        switch ( format ){

            case "json":

                let jsonSelection = JSON.parse(JSON.stringify(selection))

                for( let photo of jsonSelection){
        
                    const res = await fetch('/api/guess/likely/' + photo._id, {
                        method: "GET",
                        headers: { 'Authorization': `Bearer ${ user.token }`
                        }
                    })
        
                    const json = await res.json()
        
                    if(res.ok){
                        photo.probable_species = []
                        for (let i = 0; i < json.species.length; i++){
                            photo.probable_species.push({
                                species: json.species[i],
                                certitude: json.cert[i]
                            })
                        }
                    }
                }

                
                console.log("json: ", jsonSelection)
                console.log("photo link: ", link)
                return {data: JSON.stringify(jsonSelection), zip: zipData}


            case "csv":


                let csvSelection = JSON.parse(JSON.stringify(selection))
                for ( let photo of csvSelection){

                    const res = await fetch('/api/guess/likely/' + photo._id, {
                        method: "GET",
                        headers: { 'Authorization': `Bearer ${ user.token }`
                        }
                    })

                    const json = await res.json()

                    if(res.ok){

                        photo.probable_species = json.species[0]
                        photo.probable_species_certitude = json.cert[0]
                        }
                    }

                console.log("csv: ", csvSelection)
                return {data: Papa.unparse(JSON.stringify(csvSelection)), zip: zipData}

            default: return null
        }
    }


    return { generateDataset, loading, error }
}



