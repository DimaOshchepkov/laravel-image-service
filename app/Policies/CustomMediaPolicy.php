<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Media\CustomMedia;

class CustomMediaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CustomMedia $customMedia): bool
    {
        return $this->isUserMedia($user, $customMedia);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CustomMedia $customMedia): bool
    {
        return $this->isUserMedia($user, $customMedia);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CustomMedia $customMedia): bool
    {
        return $this->isUserMedia($user, $customMedia);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CustomMedia $customMedia): bool
    {
        return $this->isUserMedia($user, $customMedia);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CustomMedia $customMedia): bool
    {
        return $this->isUserMedia($user, $customMedia);
    }

    private function isUserMedia(User $user, CustomMedia $customMedia): bool
    {
        return $customMedia->model_type === get_class($user) && $customMedia->model_id === $user->id;
    }

    public function generateLink(User $user, CustomMedia $media): bool
    {
        return $this->isUserMedia($user, $media);
    }
}
