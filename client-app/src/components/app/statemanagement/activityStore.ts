import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/axiosagnet';
import { Activity } from '../models/Activity';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {

    //states
    activitiesMap = new Map< string , Activity>();
    selectedActivity: Activity | undefined = undefined;

    loading: boolean = true;
    editMode: boolean = false;
    submitting: boolean = false;
    deleting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    //sorted activities
    get activityByDate(){
        return Array.from(this.activitiesMap.values()).sort( (a ,b )=> Date.parse(a.date) - Date.parse( b.date));
    }

    loadingActivities = async () => {
        this.setLoadingInitiat(true);
        try {
            let activities: Activity[] = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split("T")[0];
                this.activitiesMap.set(activity.id , activity);
            });

            this.setLoadingInitiat(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitiat(false);
        }
    }

    setLoadingInitiat = (loading: boolean) => { this.loading = loading; }

    setEditMode = (val: boolean) => this.editMode = val;
    setSubmitting = (val: boolean) => this.submitting = val;
    setDeleting = (val: boolean) => this.deleting = val;

    setSelectedActivity = (id: string) => {
        this.selectedActivity = this.activitiesMap.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openActivityForm = (id?: string) => {
        id ? this.setSelectedActivity(id) : this.cancelSelectedActivity();
        this.setEditMode(true);
    }

    closedActivityForm() {
        this.setEditMode(false);
    }

    deleteActivity = (id: string) => {
        this.setDeleting(true);
        agent.Activities.delete(id).then(() => {
            runInAction(()=> {
                this.activitiesMap.delete(id);
                this.selectedActivity= undefined
            })
            this.setDeleting(false);
        }).catch(error => alert(error));
    }

    createOrEditActivity = async (activity: Activity) => {
        if (activity.id) {
            this.setSubmitting(true);
            agent.Activities.update(activity).then(res => {
                runInAction(()=>{                    
                    this.activitiesMap.set(activity.id,activity);
                })
                this.setSelectedActivity(activity.id);
                this.setSubmitting(false);
                this.setEditMode(false);
            }).catch(err => {
            console.log(err) ; 
            this.setSubmitting(false);
            this.setEditMode(false);
            });
        }
        else {
            this.setSubmitting(true);
            activity.id = uuid();
            try { 
                await agent.Activities.create(activity);
                runInAction(()=>{
                    this.activitiesMap.set(activity.id, activity);
                });
                this.setSelectedActivity(activity.id);
                this.setSubmitting(false);
                this.setEditMode(false);
            } catch (error) {
                console.log(error)
            }
            
        }
    }
}