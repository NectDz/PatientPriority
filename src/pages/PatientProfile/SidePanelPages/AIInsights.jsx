import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    HStack,
    Heading,
    Text,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Button
} from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIInsights() {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        heightFeet: '',
        heightInches: '',
        weightLbs: '',
        ethnicity: '',
        location: '',
        conditions: '',
        illnesses: '',
        surgeries: '',
        medications: '',
        diet: '',
        physicalActivity: '',
        smokingAlcohol: '',
        sleep: '',
        mentalHealth: '',
        geneticPredispositions: '',
        familyMentalHealth: '',
        bloodPressure: '',
        bloodSugar: '',
        cholesterol: '',
    });

    const [insights, setInsights] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the prompt from the form data
        const prompt = `Based on the patient's demographic information, medical history, lifestyle, family medical history, and vital signs, provide insights and advice in the following structured format:
        
        Instructions:
        Simpler Words: Use straightforward language, avoiding complex medical terms to make the information easier to understand.
        Better Formatting: Organize the response with clear headers and bullet points for easy reading.
        Structured Response: Arrange information logically, so each section follows a clear, consistent flow.
        Concise Information: Provide only the key points without unnecessary detail, ensuring the response is brief and to the point.
        Risk Assessment
        Identify possible health risks based on patient data, including:
        
        Obesity: Explain how the patient’s BMI indicates obesity and related health problems.
        Heart Disease: Highlight risk factors such as high blood pressure, high cholesterol, and family history.
        Diabetes: Describe the impact of high blood sugar and obesity on diabetes risk.
        Mental Health: Outline potential mental health risks based on self-reported issues and family background.
        Respiratory Problems: Evaluate how smoking increases the risk of lung conditions.
        Significant Health Risks
        Summarize major health concerns, such as:
        
        Heart Attacks and Strokes: Explain how combined factors like obesity, high blood pressure, and smoking raise these risks.
        Diabetes Complications: Discuss how unmanaged diabetes can lead to other issues, such as nerve damage or kidney problems.
        Mental Health Issues: Note the risk of worsening mental health without proper care.
        Cancer: Highlight how smoking raises the risk of cancer, especially lung cancer.
        Health Trends
        Provide an overview of health patterns observed, including:
        
        Age-Related Changes: Consider health decline due to aging.
        Chronic Disease Risks: Address the likelihood of chronic illnesses from lifestyle factors.
        Mental Health Outlook: Discuss the potential for declining mental health without intervention.
        Effects of Smoking: Summarize the long-term impact of continued smoking.
        Preventive Measures
        Recommend steps to improve overall health, such as:
        
        Healthy Diet: Suggest a balanced diet rich in fruits, vegetables, lean proteins, and whole grains. Limit processed foods and sugary drinks.
        Exercise: Encourage regular physical activity (at least 30 minutes daily) and consulting a doctor before starting.
        Quit Smoking: Stress the importance of quitting and suggest methods like therapy or support groups.
        Mental Health Care: Recommend seeking help from a therapist or counselor.
        Better Sleep: Provide tips on creating a sleep-friendly routine and when to seek help.
        Customized Care Plans
        Develop personalized care strategies, covering:
        
        Regular Check-ups: Emphasize the importance of routine health monitoring.
        Screening Tests: Recommend screenings for conditions like diabetes and cancer.
        Medication Review: Guide patients on managing medications effectively for conditions like hypertension and mental health.
        Weight Control: Offer plans to achieve and maintain a healthy weight.
        Support Groups: Suggest joining groups for issues like smoking cessation or mental health support.
        Medication Optimization
        Provide advice on optimizing medication for health management:
        
        Blood Pressure: Discuss medication options for maintaining healthy blood pressure.
        Cholesterol: Suggest consulting about medications like statins to manage cholesterol.
        Mental Health: Consider possible mental health medications for better mood management.
        Quit Smoking Aids: Advise on using aids like nicotine patches or gum to help quit smoking.
        Note: This information is for general guidance only. Please consult a healthcare provider for personalized advice.

        Patient Information:
        Age: ${formData.age}
        Gender: ${formData.gender}
        Height: ${formData.height} cm
        Weight: ${formData.weight} kg
        Ethnicity: ${formData.ethnicity}
        Location: ${formData.location}

        Medical History:
        Existing Conditions: ${formData.conditions}
        Previous Illnesses/Injuries: ${formData.illnesses}
        Surgeries: ${formData.surgeries}
        Medications: ${formData.medications}

        Lifestyle Information:
        Dietary Habits: ${formData.diet}
        Physical Activity: ${formData.physicalActivity}
        Smoking & Alcohol Use: ${formData.smokingAlcohol}
        Sleep Patterns: ${formData.sleep}
        Mental Health: ${formData.mentalHealth}

        Family Medical History:
        Genetic Predispositions: ${formData.geneticPredispositions}
        Family Mental Health: ${formData.familyMentalHealth}

        Vital Signs & Lab Results:
        Blood Pressure: ${formData.bloodPressure}
        Blood Sugar Levels: ${formData.bloodSugar}
        Cholesterol Levels: ${formData.cholesterol}`;

        try {
            const genAI = new GoogleGenerativeAI("AIzaSyBjS1JWxIHWelk5RAByztdZ2WzS2X2tlf0"); // Replace with your actual API key
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);

            setInsights(result.response.text());
        } catch (error) {
            console.error('Error:', error);
            setInsights("Failed to generate insights. Please try again.");
        }
    };

    return (
        <ChakraProvider>
            <Box bg="#F4F4F9" minHeight="100vh" padding="2rem" color="#333" display="flex" justifyContent="center" alignItems="center">
                <VStack
                    spacing={8}
                    align="stretch"
                    width="80%"
                    maxWidth="1200px"
                    boxShadow="lg"
                    bg="white"
                    borderRadius="md"
                    padding="2rem"
                >
                    <Heading as="h1" size="lg" textAlign="center" color="#0B2545">
                        AI Insights
                    </Heading>
                    <Divider />

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            {/* Example form controls (for age, gender, height, etc.) */}
                            <FormControl id="age" isRequired>
                                <FormLabel>Age</FormLabel>
                                <Input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id="gender" isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Select>
                            </FormControl>
                            {/* Height */}
                            <FormControl id="height" isRequired>
                                <FormLabel>Height</FormLabel>
                                <HStack>
                                    <Input
                                        type="number"
                                        name="heightFeet"
                                        value={formData.heightFeet}
                                        onChange={handleChange}
                                        placeholder="Feet"
                                    />
                                    <Input
                                        type="number"
                                        name="heightInches"
                                        value={formData.heightInches}
                                        onChange={handleChange}
                                        placeholder="Inches"
                                    />
                                </HStack>
                            </FormControl>

                            {/* Weight */}
                            <FormControl id="weightLbs" isRequired>
                                <FormLabel>Weight (in lbs)</FormLabel>
                                <Input
                                    type="number"
                                    name="weightLbs"
                                    value={formData.weightLbs}
                                    onChange={handleChange}
                                    placeholder="Enter your weight in lbs"
                                />
                            </FormControl>

                            {/* Ethnicity/Race */}
                            <FormControl id="ethnicity" isRequired>
                                <FormLabel>Ethnicity/Race</FormLabel>
                                <Select name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
                                    <option value="Asian">Asian</option>
                                    <option value="Black/African American">Black/African American</option>
                                    <option value="Hispanic/Latino">Hispanic/Latino</option>
                                    <option value="White/Caucasian">White/Caucasian</option>
                                    <option value="Native American/Alaskan Native">Native American/Alaskan Native</option>
                                    <option value="Middle Eastern/North African">Middle Eastern/North African</option>
                                    <option value="Pacific Islander/Native Hawaiian">Pacific Islander/Native Hawaiian</option>
                                    <option value="Mixed Race">Mixed Race</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.ethnicity === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Geographic Location */}
                            <FormControl id="geographicLocation" isRequired>
                                <FormLabel>Geographic Location</FormLabel>
                                <Select name="geographicLocation" value={formData.geographicLocation} onChange={handleChange}>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Oceania">Oceania</option>
                                    <option value="Middle East">Middle East</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.geographicLocation === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Existing Conditions */}
                            <FormControl id="existingConditions">
                                <FormLabel>Existing Conditions</FormLabel>
                                <Select name="existingConditions" value={formData.existingConditions} onChange={handleChange}>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Hypertension">Hypertension (High Blood Pressure)</option>
                                    <option value="Heart Disease">Heart Disease</option>
                                    <option value="Asthma">Asthma</option>
                                    <option value="Allergies">Allergies</option>
                                    <option value="Arthritis">Arthritis</option>
                                    <option value="Chronic Pain">Chronic Pain</option>
                                    <option value="Cancer">Cancer</option>
                                    <option value="Mental Health Disorder">Mental Health Disorder (e.g., Depression, Anxiety)</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.existingConditions === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Previous Illnesses/Injuries */}
                            <FormControl id="previousIllnesses">
                                <FormLabel>Previous Illnesses/Injuries</FormLabel>
                                <Select name="previousIllnesses" value={formData.previousIllnesses} onChange={handleChange}>
                                    <option value="Fractures">Fractures</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Hospitalization">Hospitalization</option>
                                    <option value="Infectious Diseases">Infectious Diseases (e.g., COVID-19, Influenza)</option>
                                    <option value="Respiratory Illness">Respiratory Illness</option>
                                    <option value="Heart Attack">Heart Attack</option>
                                    <option value="Stroke">Stroke</option>
                                    <option value="None">None</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.previousIllnesses === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Surgeries */}
                            <FormControl id="surgeries">
                                <FormLabel>Surgeries</FormLabel>
                                <Select name="surgeries" value={formData.surgeries} onChange={handleChange}>
                                    <option value="Appendectomy">Appendectomy</option>
                                    <option value="Gallbladder Removal">Gallbladder Removal</option>
                                    <option value="Hernia Repair">Hernia Repair</option>
                                    <option value="Heart Surgery">Heart Surgery</option>
                                    <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                                    <option value="Gastrointestinal Surgery">Gastrointestinal Surgery</option>
                                    <option value="Gynecological Surgery">Gynecological Surgery</option>
                                    <option value="Cosmetic Surgery">Cosmetic Surgery</option>
                                    <option value="None">None</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.surgeries === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Medications */}
                            <FormControl id="medications">
                                <FormLabel>Medications</FormLabel>
                                <Select name="medications" value={formData.medications} onChange={handleChange}>
                                    <option value="Pain Relievers">Pain Relievers (e.g., Ibuprofen, Acetaminophen)</option>
                                    <option value="Antibiotics">Antibiotics</option>
                                    <option value="Antidepressants">Antidepressants</option>
                                    <option value="Insulin">Insulin</option>
                                    <option value="Blood Pressure Medications">Blood Pressure Medications</option>
                                    <option value="Antihistamines">Antihistamines</option>
                                    <option value="None">None</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.medications === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Dietary Habits */}
                            <FormControl id="dietaryHabits">
                                <FormLabel>Dietary Habits</FormLabel>
                                <Select name="dietaryHabits" value={formData.dietaryHabits} onChange={handleChange}>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Pescatarian">Pescatarian</option>
                                    <option value="Keto">Keto</option>
                                    <option value="Low-Carb">Low-Carb</option>
                                    <option value="Gluten-Free">Gluten-Free</option>
                                    <option value="Balanced Diet">Balanced Diet</option>
                                    <option value="Irregular">Irregular</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.dietaryHabits === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Physical Activity */}
                            <FormControl id="physicalActivity">
                                <FormLabel>Physical Activity</FormLabel>
                                <Select name="physicalActivity" value={formData.physicalActivity} onChange={handleChange}>
                                    <option value="Sedentary">Sedentary (little or no exercise)</option>
                                    <option value="Light Activity">Light Activity (1-2 times a week)</option>
                                    <option value="Moderate Activity">Moderate Activity (3-4 times a week)</option>
                                    <option value="Very Active">Very Active (5+ times a week)</option>
                                    <option value="Athlete">Athlete (Intensive training)</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.physicalActivity === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Smoking */}
                            <FormControl id="smoking">
                                <FormLabel>Smoking</FormLabel>
                                <Select name="smoking" value={formData.smoking} onChange={handleChange}>
                                    <option value="Non-Smoker">Non-Smoker</option>
                                    <option value="Occasional Smoker">Occasional Smoker</option>
                                    <option value="Regular Smoker">Regular Smoker</option>
                                    <option value="Former Smoker">Former Smoker</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </Select>
                            </FormControl>

                            {/* Alcohol Use */}
                            <FormControl id="alcohol">
                                <FormLabel>Alcohol Use</FormLabel>
                                <Select name="alcohol" value={formData.alcohol} onChange={handleChange}>
                                    <option value="Non-Drinker">Non-Drinker</option>
                                    <option value="Occasional Drinker">Occasional Drinker</option>
                                    <option value="Moderate Drinker">Moderate Drinker</option>
                                    <option value="Heavy Drinker">Heavy Drinker</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </Select>
                            </FormControl>

                            {/* Sleep Patterns */}
                            <FormControl id="sleepPatterns">
                                <FormLabel>Sleep Patterns</FormLabel>
                                <Select name="sleepPatterns" value={formData.sleepPatterns} onChange={handleChange}>
                                    <option value="Less than 4 hours">Less than 4 hours per night</option>
                                    <option value="4-6 hours">4-6 hours per night</option>
                                    <option value="6-8 hours">6-8 hours per night</option>
                                    <option value="More than 8 hours">More than 8 hours per night</option>
                                    <option value="Irregular">Irregular Sleep Pattern</option>
                                </Select>
                            </FormControl>

                            {/* Mental Health */}
                            <FormControl id="mentalHealth">
                                <FormLabel>Mental Health</FormLabel>
                                <Select name="mentalHealth" value={formData.mentalHealth} onChange={handleChange}>
                                    <option value="No mental health concerns">No mental health concerns</option>
                                    <option value="Experiencing Stress">Experiencing Stress</option>
                                    <option value="Anxiety">Anxiety</option>
                                    <option value="Depression">Depression</option>
                                    <option value="Mood Disorder">Mood Disorder</option>
                                    <option value="Seeking Therapy">Seeking Therapy</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </Select>
                            </FormControl>

                            {/* Genetic Predispositions */}
                            <FormControl id="geneticPredispositions">
                                <FormLabel>Genetic Predispositions</FormLabel>
                                <Select name="geneticPredispositions" value={formData.geneticPredispositions} onChange={handleChange}>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Heart Disease">Heart Disease</option>
                                    <option value="Cancer">Cancer</option>
                                    <option value="Obesity">Obesity</option>
                                    <option value="Mental Health Disorders">Mental Health Disorders</option>
                                    <option value="None">None</option>
                                    <option value="Other">Other</option>
                                </Select>
                                {formData.geneticPredispositions === 'Other' && (
                                    <Input placeholder="Please specify" name="otherText" value={formData.otherText} onChange={handleChange} />
                                )}
                            </FormControl>

                            {/* Family Mental Health */}
                            <FormControl id="familyMentalHealth">
                                <FormLabel>Family Mental Health</FormLabel>
                                <Select name="familyMentalHealth" value={formData.familyMentalHealth} onChange={handleChange}>
                                    <option value="No family history">No family history</option>
                                    <option value="Anxiety">Anxiety</option>
                                    <option value="Depression">Depression</option>
                                    <option value="Bipolar Disorder">Bipolar Disorder</option>
                                    <option value="Schizophrenia">Schizophrenia</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </Select>
                            </FormControl>

                            {/* Blood Pressure */}
                            <FormControl id="bloodPressure">
                                <FormLabel>Blood Pressure</FormLabel>
                                <Select name="bloodPressure" value={formData.bloodPressure} onChange={handleChange}>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Elevated">Elevated</option>
                                    <option value="High (Stage 1 Hypertension)">High (Hypertension Stage 1)</option>
                                    <option value="Very High (Stage 2 Hypertension)">Very High (Hypertension Stage 2)</option>
                                    <option value="Hypertensive Crisis">Hypertensive Crisis</option>
                                    <option value="Not sure">Not sure</option>
                                </Select>
                            </FormControl>

                            {/* Blood Sugar Levels */}
                            <FormControl id="bloodSugar">
                                <FormLabel>Blood Sugar Levels</FormLabel>
                                <Select name="bloodSugar" value={formData.bloodSugar} onChange={handleChange}>
                                    <option value="Normal">Normal</option>
                                    <option value="Pre-diabetic">Pre-diabetic</option>
                                    <option value="Diabetic">Diabetic</option>
                                    <option value="Low (Hypoglycemia)">Low (Hypoglycemia)</option>
                                    <option value="Not sure">Not sure</option>
                                </Select>
                            </FormControl>

                            {/* Cholesterol Levels */}
                            <FormControl id="cholesterol">
                                <FormLabel>Cholesterol Levels</FormLabel>
                                <Select name="cholesterol" value={formData.cholesterol} onChange={handleChange}>
                                    <option value="Normal">Normal</option>
                                    <option value="Borderline High">Borderline High</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                    <option value="Not sure">Not sure</option>
                                </Select>
                            </FormControl>

                            <Button colorScheme="blue" type="submit" width="full">
                                Generate Insights
                            </Button>
                        </VStack>
                    </form>

                    {/* Display insights */}
                    {insights && (
                        <Box mt={10}>
                            <Divider mb={5} />
                            <Heading as="h2" size="md" mb={4}>
                                AI-Generated Health Insights
                            </Heading>
                            <Text whiteSpace="pre-wrap">{insights}</Text>
                        </Box>
                    )}
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default AIInsights;
