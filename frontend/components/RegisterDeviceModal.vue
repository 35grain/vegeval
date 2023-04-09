<template>
    <div>
        <input type="checkbox" id="new-device-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-6/12 max-w-3xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Register new device</h1>
                    <small>New devices will be assigned a unique API key after registration.</small>
                </div>
                <form>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Device label</span>
                        </label>
                        <input type="text" placeholder="Device 1" class="input input-bordered w-full max-w-xs" required />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Evaluation model</span>
                        </label>
                        <select class="select select-bordered" required>
                            <option disabled selected>Select one</option>
                            <option>Red potatoes v1.0</option>
                            <option disabled>Yellow potatoes</option>
                        </select>
                    </div>
                    <div class="flex justify-between mt-6">
                        <button class="btn btn-primary">Register</button>
                        <label for="new-device-modal" class="btn btn-error">Cancel</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>