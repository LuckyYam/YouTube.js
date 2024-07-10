import type Player from '../../../core/Player.js';
import type { RawNode } from '../../index.js';
export default class Format {
    #private;
    itag: number;
    url?: string;
    width?: number;
    height?: number;
    last_modified: Date;
    content_length?: number;
    quality?: string;
    xtags?: string;
    drm_families?: string[];
    fps?: number;
    quality_label?: string;
    projection_type?: 'RECTANGULAR' | 'EQUIRECTANGULAR' | 'EQUIRECTANGULAR_THREED_TOP_BOTTOM' | 'MESH';
    average_bitrate?: number;
    bitrate: number;
    spatial_audio_type?: 'AMBISONICS_5_1' | 'AMBISONICS_QUAD' | 'FOA_WITH_NON_DIEGETIC';
    target_duration_dec?: number;
    fair_play_key_uri?: string;
    stereo_layout?: 'LEFT_RIGHT' | 'TOP_BOTTOM';
    max_dvr_duration_sec?: number;
    high_replication?: boolean;
    audio_quality?: string;
    approx_duration_ms: number;
    audio_sample_rate?: number;
    audio_channels?: number;
    loudness_db?: number;
    signature_cipher?: string;
    is_drc?: boolean;
    drm_track_type?: string;
    distinct_params?: string;
    track_absolute_loudness_lkfs?: number;
    mime_type: string;
    is_type_otf: boolean;
    init_range?: {
        start: number;
        end: number;
    };
    index_range?: {
        start: number;
        end: number;
    };
    cipher?: string;
    audio_track?: {
        audio_is_default: boolean;
        display_name: string;
        id: string;
    };
    has_audio: boolean;
    has_video: boolean;
    has_text: boolean;
    language?: string | null;
    is_dubbed?: boolean;
    is_descriptive?: boolean;
    is_original?: boolean;
    color_info?: {
        primaries?: string;
        transfer_characteristics?: string;
        matrix_coefficients?: string;
    };
    caption_track?: {
        display_name: string;
        vss_id: string;
        language_code: string;
        kind?: 'asr' | 'frc';
        id: string;
    };
    constructor(data: RawNode, this_response_nsig_cache?: Map<string, string>);
    /**
     * Deciphers the streaming url of the format.
     * @returns Deciphered URL.
     */
    decipher(player: Player | undefined): string;
}
