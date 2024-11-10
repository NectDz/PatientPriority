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
    Button,
    UnorderedList,
    ListItem,
    Icon
} from "@chakra-ui/react";
import { FaHeartbeat, FaAppleAlt, FaRunning, FaStar } from 'react-icons/fa';
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

    const [rawInsights, setRawInsights] = useState(null); // State for raw response
    const [insights, setInsights] = useState(null); // State for parsed response

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the prompt from the form data
        const prompt = `
        Based on the patient's demographic information, medical history, lifestyle habits, family medical history, and vital signs, generate a personalized health insights summary in JSON format. If specific information is missing or not applicable, generate insights based on general trends for similar profiles. Ensure that the response follows this exact JSON structure:
        
        {
            "diagnoses": [
                {"condition": "Condition 1", "description": "Brief description of Condition 1"},
                {"condition": "Condition 2", "description": "Brief description of Condition 2"},
                {"condition": "Condition 3", "description": "Brief description of Condition 3"},
                {"condition": "Condition 4", "description": "Brief description of Condition 4"},
                {"condition": "Condition 5", "description": "Brief description of Condition 5"}
            ],
            "preventive_tips": {
                "diet": "One specific suggestion for improving nutrition based on the patient's profile",
                "activity": "A recommended type or amount of exercise suitable for the patient's lifestyle and physical condition",
                "health_monitoring": "One key health check-up or screening that the patient should prioritize, such as blood pressure or cholesterol check"
            },
            "health_goal": "A simple, realistic health goal that the patient can work toward based on their current profile, like walking 15 minutes daily or adding a vegetable to each meal",
            "health_horoscope": "A playful, light-hearted, health-related 'Health Horoscope' line with humor, such as 'A salad is in your future; don’t be afraid to add a sprinkle of cheese for excitement' or 'Today’s exercise forecast predicts light stretching with a high chance of couch time'"
        }
        
        Additional Instructions:
        - In the "diagnoses" section, include exactly 5 common health conditions or illnesses that people with a similar patient profile  typically experience. If specific medical history is missing, base these on general trends for the patient’s demographic.
        - Ensure all language is clear, simple, and straightforward for easy understanding, especially for older patients.
        - Avoid complex medical jargon; focus on actionable, useful insights.
        - Do not use stars (*) or quotation marks (" ") in the response.
        - Use consistent formatting in JSON, with keys in lowercase and descriptive content as specified.
        
        **Patient Information:**
        - Age: ${formData.age}
        - Gender: ${formData.gender}
        - Height: ${formData.heightFeet} ft ${formData.heightInches} in
        - Weight: ${formData.weightLbs} lbs
        - Ethnicity: ${formData.ethnicity}
        - Location: ${formData.location}
        
        **Medical History:**
        - Existing Conditions: ${formData.conditions}
        - Previous Illnesses/Injuries: ${formData.illnesses}
        - Surgeries: ${formData.surgeries}
        - Medications: ${formData.medications}
        
        **Lifestyle Information:**
        - Dietary Habits: ${formData.diet}
        - Physical Activity: ${formData.physicalActivity}
        - Smoking & Alcohol Use: ${formData.smokingAlcohol}
        - Sleep Patterns: ${formData.sleep}
        - Mental Health: ${formData.mentalHealth}
        
        **Family Medical History:**
        - Genetic Predispositions: ${formData.geneticPredispositions}
        - Family Mental Health: ${formData.familyMentalHealth}
        
        **Vital Signs & Lab Results:**
        - Blood Pressure: ${formData.bloodPressure}
        - Blood Sugar Levels: ${formData.bloodSugar}
        - Cholesterol Levels: ${formData.cholesterol}
        `;
        
        
        
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyBjS1JWxIHWelk5RAByztdZ2WzS2X2tlf0"); // Replace with your actual API key
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            const rawResponse = result.response.text(); // Store the raw response
            setRawInsights(rawResponse);

            const jsonResponse = rawResponse.match(/\{.*\}/s)[0]; // Extract JSON with regex
            const parsedInsights = JSON.parse(jsonResponse); // Parse JSON response
            setInsights(parsedInsights);
        } catch (error) {
            console.error('Error:', error);
            setRawInsights("Failed to generate insights. Please try again.");
            setInsights(null);
        }
    };


    return (
        <ChakraProvider>
            <Box 
                bgGradient="linear(to-br, blue.50, gray.50)" 
                minHeight="100vh" 
                padding={{ base: "1rem", md: "2rem", lg: "3rem" }} 
                color="#333"
            >
                <VStack
                    spacing={8}
                    align="stretch"
                    width={{ base: "95%", md: "90%", lg: "80%" }}
                    maxWidth="1200px"
                    mx="auto"
                    bg="rgba(255, 255, 255, 0.6)"
                    borderRadius="xl"
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
                    padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
                    transition="all 0.3s"
                    _hover={{ boxShadow: "2xl" }}
                >
                    <Heading as="h1" size="lg" textAlign="center" color="#00366d">
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

                            <Button
                                bg="#335d8f"  // Default color - lighter blue
                                color="white"
                                _hover={{ bg: "#0B2545" }} // Darker shade for hover
                                fontSize="lg" // Increase font size
                                paddingX="2rem" // Increase padding for a larger button
                                paddingY="1.5rem"
                                borderRadius="md"
                                type="submit"
                                width="full"
                                
                            >
                                Generate Insights
                            </Button>

                        </VStack>
                    </form>

                    {/* Display the raw response */}
                    {rawInsights && (
                        <Box mt={10} p={4} bg="gray.100" borderRadius="md">
                            <Heading as="h3" size="md" mb={3}>Raw AI Response</Heading>
                            <Text fontSize="md" whiteSpace="pre-wrap">{rawInsights}</Text>
                        </Box>
                    )}

                    {insights && (
                        <Box mt={10}>
                            <Divider mb={5} />
                            <Heading as="h2" size="lg" mb={4} textAlign="center">Formatted AI-Generated Health Insights</Heading>
                            <Box>
                                <Box mb={6} p={4} bg="blue.50" borderRadius="md" boxShadow="sm">
                                    <HStack spacing={3}>
                                        <Icon as={FaHeartbeat} color="blue.500" boxSize={6} />
                                        <Text fontWeight="bold" color="blue.700" fontSize="2xl">Common Diagnoses/Conditions</Text>
                                    </HStack>
                                    <UnorderedList mt={2} spacing={2}>
                                        {insights.diagnoses.map((diag, index) => (
                                            <ListItem key={index} color="#333" fontSize="lg">
                                                <Text as="span" fontWeight="semibold">{diag.condition}:</Text> {diag.description}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </Box>

                                <Box mb={6} p={4} bg="green.50" borderRadius="md" boxShadow="sm">
                                    <HStack spacing={3}>
                                        <Icon as={FaAppleAlt} color="green.500" boxSize={6} />
                                        <Text fontWeight="bold" color="green.700" fontSize="2xl">Preventive Tips</Text>
                                    </HStack>
                                    <UnorderedList mt={2} spacing={2}>
                                        <ListItem fontSize="lg">
                                            <Text as="span" fontWeight="semibold"><strong>Diet:</strong></Text> {insights.preventive_tips.diet}
                                        </ListItem>
                                        <ListItem fontSize="lg">
                                            <Text as="span" fontWeight="semibold"><strong>Activity:</strong></Text> {insights.preventive_tips.activity}
                                        </ListItem>
                                        <ListItem fontSize="lg">
                                            <Text as="span" fontWeight="semibold"><strong>Health Monitoring:</strong></Text> {insights.preventive_tips.health_monitoring}
                                        </ListItem>
                                    </UnorderedList>
                                </Box>

                                <Box mb={6} p={4} bg="yellow.50" borderRadius="md" boxShadow="sm">
                                    <HStack spacing={3}>
                                        <Icon as={FaRunning} color="yellow.500" boxSize={6} />
                                        <Text fontWeight="bold" color="yellow.700" fontSize="2xl">Health Goal</Text>
                                    </HStack>
                                    <Text mt={2} fontSize="lg" fontWeight="medium">{insights.health_goal}</Text>
                                </Box>

                                <Box mb={6} p={4} bg="purple.50" borderRadius="md" boxShadow="sm">
                                    <HStack spacing={3}>
                                        <Icon as={FaStar} color="purple.500" boxSize={6} />
                                        <Text fontWeight="bold" color="purple.700" fontSize="2xl">Health Horoscope</Text>
                                    </HStack>
                                    <Text mt={2} fontSize="lg" fontWeight="medium">{insights.health_horoscope}</Text>
                                </Box>

                            </Box>
                        </Box>

                    )}
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default AIInsights;
