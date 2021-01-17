def getSymptoms():
        user_input_symptoms = [];
        print("Must Enter 3  to predict some Causes by this Algorithm.");
        for e in range(0,3):
            user_input_symptoms.append(str(input("Enter Symptom %i: "%(e+1))));
        
        # print("user_input_symptoms: ",user_input_symptoms);
        trans_data = pd.read_csv('Book1.csv', header=None)
        trans_data.head()
        trans_data.shape
        
        # All Causes fetched from  the dataset
        causes = list(trans_data[0]);
        # print(trans_data.head())
        records = []
        for i in range(0, 10):
            records.append([str(trans_data.values[i,j]) for j in range(0, 2)])
        association_rules = apriori(records, min_support=0.05, min_confidence=0.1, min_lift=1, min_length=2)
        association_results = list(association_rules)
        print("records: ", records)
        print();
        print(len(association_results))
        print();
        # confidence = []
        # for i in range(0, len(association_results)):
        #     confidence.append(association_results[i][2][0][2]);
        
        indexes = [];
        for i in range (0, len(association_results)):
            print();
            print(association_results[i]);
            print();
            cause_symptoms = list(association_results[i][0]);
            # print("Cause and symptoms: ",cause_symptoms);
            
            if(len(cause_symptoms)==1):
                cause_symptoms = list(cause_symptoms[0].split(","));

            if(len(cause_symptoms)==2):
                cause_symptoms = list(cause_symptoms[0].split(","))+list(cause_symptoms[1].split(","));
            
            # Remove spaces in start
            updated_cause_symptoms = [];
            for e in range(0,len(cause_symptoms)):
                if(cause_symptoms[e][0]==' '):
                    updated_cause_symptoms.append(cause_symptoms[e][1:len(cause_symptoms[e])]);
                else:
                    updated_cause_symptoms.append(cause_symptoms[e]);
            
            cause_symptoms = updated_cause_symptoms;
            print("Cause and symptoms: ",cause_symptoms);
            print("Confidence: ",association_results[i][2][0][2]);
            counter = 0;
            for e in range(0,len(user_input_symptoms)):
                # print("user_input_symptoms[e]: ",user_input_symptoms[e] in cause_symptoms);
                if(user_input_symptoms[e] in cause_symptoms):
                    counter = counter + 1;
            # print("counter: ",counter);
            if(counter>=2):
                indexes.append(i);
        
        result_set = [];
        for i in range(0,len(indexes)):
            conf = association_results[indexes[i]][2][0][2];
            if(conf==1.0):
                result_set.append(list(association_results[indexes[i]][0]));
        # print("result_set: ",result_set);
        # Fetch Only causes
        resultant_causes = [];
        for i in range(0,len(result_set)):        
            for j in range(0,len(result_set[i])):
                if(result_set[i][j] in causes):
                    resultant_causes.append(result_set[i][j]);
        
        print(" ");
        print("Causes: ",resultant_causes);
        #print(association_results[0][0])
        #sets=[association_results[0][0]]
        #print([list(x) for x in sets])

        # test = []
        # for i in range (0, len(association_results)):
        #     sets=[association_results[i][0]]
        #     test.append([list(x) for x in sets])
        # print("test: ",test);
        # print();
        # print(len(test));
        # print();
        # filterList = []
        # # print(len(sym))
        # return jsonify({"result" : "Deleted Successfully"})