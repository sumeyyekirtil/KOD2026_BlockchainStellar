#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol, Vec,
};

#[contract]
pub struct ScholarshipContract;

#[contracttype]
#[derive(Clone)]
pub struct Application {
    pub applicant: Address,
    pub description: Symbol,
    pub approved: bool,
}

#[contracttype]
pub enum DataKey {
    Application(Address),
    GMCount,
    GNCount,
    Admin,
}

#[contractimpl]
impl ScholarshipContract {

    // ------------------------
    // INIT (Admin set)
    // ------------------------
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    // ------------------------
    // APPLY FOR SCHOLARSHIP
    // ------------------------
    pub fn apply_scholarship(env: Env, applicant: Address, description: Symbol) {
        applicant.require_auth();

        let app = Application {
            applicant: applicant.clone(),
            description,
            approved: false,
        };

        env.storage()
            .instance()
            .set(&DataKey::Application(applicant), &app);
    }

    // ------------------------
    // APPROVE SCHOLARSHIP
    // ------------------------
    pub fn approve_scholarship(env: Env, applicant: Address) {
        let admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .unwrap();

        admin.require_auth();

        let mut app: Application = env
            .storage()
            .instance()
            .get(&DataKey::Application(applicant.clone()))
            .unwrap();

        app.approved = true;

        env.storage()
            .instance()
            .set(&DataKey::Application(applicant), &app);
    }

    // ------------------------
    // SAY GM
    // ------------------------
    pub fn say_gm(env: Env) {
        let mut count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::GMCount)
            .unwrap_or(0);

        count += 1;

        env.storage()
            .instance()
            .set(&DataKey::GMCount, &count);
    }

    // ------------------------
    // SAY GN
    // ------------------------
    pub fn say_gn(env: Env) {
        let mut count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::GNCount)
            .unwrap_or(0);

        count += 1;

        env.storage()
            .instance()
            .set(&DataKey::GNCount, &count);
    }

    // ------------------------
    // GETTERS
    // ------------------------
    pub fn get_gm_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::GMCount)
            .unwrap_or(0)
    }

    pub fn get_gn_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::GNCount)
            .unwrap_or(0)
    }

    pub fn get_application(env: Env, applicant: Address) -> Option<Application> {
        env.storage()
            .instance()
            .get(&DataKey::Application(applicant))
    }
}