class QC_Model {
  constructor(
    public Metadata_Col: number,
    public Metadata_Row: string,
    public Metadata_Well: string,
    public Metadata_perturbation_id: string,
    public Metadata_perturbation_type: string,
    public QC_cell_count: number,
    public QC_cell_count_cov: number,
    public QC_cov_failed: boolean,
    public QC_position_effect: number
  ) {}
}
export { QC_Model } 